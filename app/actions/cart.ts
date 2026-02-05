'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/app/actions/auth'

async function getOrCreateCart(userId: string) {
  const existing = await prisma.cart.findUnique({ where: { userId } })
  if (existing) return existing
  return prisma.cart.create({ data: { userId } })
}

export async function getCart() {
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: 'UNAUTHENTICATED' } as const

  const cart = await getOrCreateCart(user.id)

  const items = await prisma.cartItem.findMany({
    where: { cartId: cart.id },
    include: {
      item: {
        include: {
          vendor: true,
          category: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  const mapped = items.map((ci) => ({
    id: ci.item.id,
    cartItemId: ci.id,
    name: ci.item.name,
    vendor: ci.item.vendor.name,
    price: ci.price,
    quantity: ci.quantity,
    image: ci.item.image,
    category: ci.item.category.name,
    stock: ci.item.stock,
  }))

  const subtotal = mapped.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const shipping = subtotal > 50 ? 0 : mapped.length > 0 ? 5.99 : 0
  const total = subtotal + tax + shipping

  return {
    ok: true,
    items: mapped,
    subtotal,
    tax,
    shipping,
    total,
  } as const
}

export async function addToCart(itemId: string, quantity: number = 1) {
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: 'UNAUTHENTICATED' } as const

  const item = await prisma.foodItem.findUnique({ where: { id: itemId } })
  if (!item) return { ok: false, error: 'Item not found.' } as const

  const cart = await getOrCreateCart(user.id)

  const existing = await prisma.cartItem.findUnique({
    where: { cartId_itemId: { cartId: cart.id, itemId } },
  })

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    })
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        itemId,
        quantity,
        price: item.price,
      },
    })
  }

  return { ok: true } as const
}

export async function updateCartItem(itemId: string, quantity: number) {
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: 'UNAUTHENTICATED' } as const

  const cart = await getOrCreateCart(user.id)

  const existing = await prisma.cartItem.findUnique({
    where: { cartId_itemId: { cartId: cart.id, itemId } },
  })

  if (!existing) return { ok: false, error: 'Item not found.' } as const

  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: existing.id } })
    return { ok: true } as const
  }

  await prisma.cartItem.update({
    where: { id: existing.id },
    data: { quantity },
  })

  return { ok: true } as const
}

export async function removeCartItem(itemId: string) {
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: 'UNAUTHENTICATED' } as const

  const cart = await getOrCreateCart(user.id)

  const existing = await prisma.cartItem.findUnique({
    where: { cartId_itemId: { cartId: cart.id, itemId } },
  })

  if (!existing) return { ok: true } as const

  await prisma.cartItem.delete({ where: { id: existing.id } })
  return { ok: true } as const
}

export async function clearCart() {
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: 'UNAUTHENTICATED' } as const

  const cart = await getOrCreateCart(user.id)
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })
  return { ok: true } as const
}
