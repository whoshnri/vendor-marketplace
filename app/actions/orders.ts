'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/app/actions/auth'

export async function getOrders() {
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: 'UNAUTHENTICATED' } as const

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          item: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return {
    ok: true,
    orders: orders.map((order) => ({
      id: order.id,
      status: order.status,
      paymentStatus: order.paymentStatus,
      total: order.totalPrice,
      createdAt: order.createdAt,
      items: order.items.map((it) => ({
        id: it.id,
        name: it.item.name,
        qty: it.quantity,
        price: it.price,
      })),
    })),
  } as const
}

export async function createOrderFromCart() {
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: 'UNAUTHENTICATED' } as const

  const cart = await prisma.cart.findUnique({ where: { userId: user.id } })
  if (!cart) return { ok: false, error: 'Cart not found.' } as const

  const cartItems = await prisma.cartItem.findMany({
    where: { cartId: cart.id },
    include: { item: true },
  })

  if (cartItems.length === 0) return { ok: false, error: 'Cart is empty.' } as const

  const totalPrice = cartItems.reduce((sum, ci) => sum + ci.price * ci.quantity, 0)

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      totalPrice,
      status: 'PENDING',
      paymentStatus: 'UNPAID',
      items: {
        create: cartItems.map((ci) => ({
          itemId: ci.itemId,
          quantity: ci.quantity,
          price: ci.price,
        })),
      },
    },
  })

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })

  return { ok: true, orderId: order.id } as const
}

export async function completeCheckout(email: string, cardNumber: string, expiry: string, cvv: string) {
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: 'UNAUTHENTICATED' } as const

  // Create order from cart
  const orderResult = await createOrderFromCart()
  if (!orderResult.ok) {
    return { ok: false, error: orderResult.error } as const
  }

  // Update order status to completed after payment
  const updatedOrder = await prisma.order.update({
    where: { id: orderResult.orderId },
    data: {
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
    },
  })

  return { ok: true, orderId: updatedOrder.id, orderNumber: `FM-${Math.floor(100000 + Math.random() * 900000)}` } as const
}
