'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from './auth'
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

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

export async function getUserProfile() {
  const user = await getCurrentUser()
  if (!user) {
    return { ok: false, error: 'Not authenticated' } as const
  }

  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      vendorProfile: true,
      orders: {
        include: { items: true },
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
    },
  })

  if (!fullUser) {
    return { ok: false, error: 'User not found' } as const
  }

  return {
    ok: true,
    data: {
      id: fullUser.id,
      name: fullUser.name,
      email: fullUser.email,
      role: fullUser.role,
      image: fullUser.image,
      createdAt: fullUser.createdAt,
      vendorProfile: fullUser.vendorProfile,
      orders: fullUser.orders,
    },
  } as const
}

export async function updateUserProfile(params: {
  name?: string
  image?: string
}) {
  const user = await getCurrentUser()
  if (!user) {
    return { ok: false, error: 'Not authenticated' } as const
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...(params.name && { name: params.name }),
      ...(params.image !== undefined && { image: params.image }),
    },
  })

  return {
    ok: true,
    data: updated,
  } as const
}

export async function updateVendorProfile(params: {
  storeName?: string
  description?: string
  image?: string
}) {
  const user = await getCurrentUser()
  if (!user) {
    return { ok: false, error: 'Not authenticated' } as const
  }

  if (user.role !== 'VENDOR') {
    return { ok: false, error: 'Only vendors can update vendor profile' } as const
  }

  const updated = await prisma.vendorProfile.update({
    where: { userId: user.id },
    data: {
      ...(params.storeName && { storeName: params.storeName }),
      ...(params.description !== undefined && { description: params.description }),
      ...(params.image !== undefined && { image: params.image }),
    },
  })

  return {
    ok: true,
    data: updated,
  } as const
}

export async function changePassword(params: {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}) {
  const user = await getCurrentUser()
  if (!user) {
    return { ok: false, error: 'Not authenticated' } as const
  }

  if (params.newPassword !== params.confirmPassword) {
    return { ok: false, error: 'Passwords do not match' } as const
  }

  if (params.newPassword.length < 6) {
    return { ok: false, error: 'Password must be at least 6 characters' } as const
  }

  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
  })

  if (!fullUser) {
    return { ok: false, error: 'User not found' } as const
  }

  const valid = verifyPassword(params.currentPassword, fullUser.password)
  if (!valid) {
    return { ok: false, error: 'Current password is incorrect' } as const
  }

  const hashed = hashPassword(params.newPassword)

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashed },
  })

  return { ok: true } as const
}
