'use server'

import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

const SESSION_COOKIE = 'fm_session'
const SESSION_DAYS = 30

function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 32).toString('hex')
  return `${salt}:${hash}`
}

function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  const hashed = scryptSync(password, salt, 32)
  const storedBuf = Buffer.from(hash, 'hex')
  if (storedBuf.length !== hashed.length) return false
  return timingSafeEqual(storedBuf, hashed)
}

async function createSession(userId: string) {
  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)

  await (prisma as any).session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  })

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  })
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null

  const session = await (prisma as any).session.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!session) return null
  if (session.expiresAt < new Date()) {
    await (prisma as any).session.delete({ where: { token } }).catch(() => {})
    return null
  }

  return session.user
}

export async function signupAction(params: {
  name: string
  email: string
  password: string
  role: 'BUYER' | 'VENDOR'
  storeName?: string
}) {
  const { name, email, password, role, storeName } = params

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { ok: false, error: 'Email already in use.' }
  }

  const hashed = hashPassword(password)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role,
      cart: { create: {} },
      ...(role === 'VENDOR'
        ? {
            vendorProfile: {
              create: {
                storeName: storeName || `${name}'s Store`,
                description: null,
              },
            },
          }
        : {}),
    },
  })

  await createSession(user.id)

  return { ok: true }
}

export async function loginAction(params: { email: string; password: string }) {
  const { email, password } = params

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return { ok: false, error: 'Invalid email or password.' }
  }

  const valid = verifyPassword(password, user.password)
  if (!valid) {
    return { ok: false, error: 'Invalid email or password.' }
  }

  await createSession(user.id)

  return { ok: true }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (token) {
    await (prisma as any).session.delete({ where: { token } }).catch(() => {})
  }
  cookieStore.set(SESSION_COOKIE, '', { path: '/', maxAge: 0 })
  return { ok: true }
}
