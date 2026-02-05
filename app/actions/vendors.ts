'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/app/actions/auth'

export async function getVendors(limit?: number) {
  try {
    const vendors = await prisma.vendorProfile.findMany({
      include: {
        user: {
          include: {
            vendorItems: true,
            _count: {
              select: { vendorItems: true },
            },
          },
        },
      },
      ...(limit && { take: limit }),
    })

    return vendors.map((vendor) => ({
      id: vendor.id,
      userId: vendor.userId,
      name: vendor.user.name,
      storeName: vendor.storeName,
      description: vendor.description || undefined,
      image: vendor.user.image || vendor.image || undefined,
      rating: vendor.rating,
      totalSales: vendor.totalSales,
      isVerified: vendor.isVerified,
      itemCount: vendor.user._count.vendorItems,
    }))
  } catch (error) {
    console.error('Error fetching vendors:', error)
    throw error
  }
}

export async function getVendorById(vendorId: string) {
  try {
    const vendor = await prisma.vendorProfile.findUnique({
      where: { userId: vendorId },
      include: {
        user: {
          include: {
            vendorItems: {
              include: {
                category: true,
                reviews: true,
              },
            },
            _count: {
              select: { vendorItems: true },
            },
          },
        },
      },
    })

    if (!vendor) return null

    return {
      id: vendor.id,
      userId: vendor.userId,
      name: vendor.user.name,
      storeName: vendor.storeName,
      description: vendor.description,
      image: vendor.user.image || vendor.image,
      rating: vendor.rating,
      totalSales: vendor.totalSales,
      earnings: vendor.earnings,
      isVerified: vendor.isVerified,
      itemCount: vendor.user._count.vendorItems,
      items: vendor.user.vendorItems.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        stock: item.stock,
        rating: item.rating,
        reviews: item.reviews.length,
        category: item.category.name,
      })),
    }
  } catch (error) {
    console.error('Error fetching vendor:', error)
    throw error
  }
}
export async function getVendorDashboardData() {
  const user = await getCurrentUser()
  if (!user || user.role !== 'VENDOR') {
    throw new Error('UNAUTHORIZED')
  }

  try {
    const vendorProfile = await prisma.vendorProfile.findUnique({
      where: { userId: user.id },
    })

    if (!vendorProfile) {
      throw new Error('Vendor profile not found')
    }

    const items = await prisma.foodItem.findMany({
      where: { vendorId: user.id },
      include: {
        category: true,
        _count: {
          select: { orderItems: true },
        },
      },
    })

    // Get order items for this vendor's products
    const orderItems = await prisma.orderItem.findMany({
      where: {
        item: { vendorId: user.id },
      },
      include: {
        order: {
          include: {
            user: true,
          },
        },
        item: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })

    // Calculate top performing products
    const topProducts = items
      .map((item) => ({
        id: item.id,
        name: item.name,
        sales: item._count.orderItems,
        revenue: item.price * item._count.orderItems,
        rating: item.rating,
      }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5)

    return {
      vendorProfile: {
        storeName: vendorProfile.storeName,
        totalSales: vendorProfile.totalSales,
        earnings: vendorProfile.earnings,
      },
      stats: {
        totalSales: vendorProfile.totalSales,
        earnings: vendorProfile.earnings,
        activeProducts: items.length,
        ordersThisMonth: orderItems.length, // Simplified for now
      },
      recentOrders: orderItems.map((oi) => ({
        id: oi.order.id,
        customer: oi.order.user.name,
        items: `${oi.item.name} x${oi.quantity}`,
        amount: oi.price * oi.quantity,
        status: oi.order.status,
        date: oi.order.createdAt.toLocaleDateString(),
      })),
      topProducts,
      inventory: items.map((item) => ({
        id: item.id,
        name: item.name,
        stock: item.stock,
        threshold: 10, // Default threshold
        status: item.stock === 0 ? 'Out of Stock' : item.stock < 10 ? 'Low' : 'Good',
      })),
    }
  } catch (error) {
    console.error('Error fetching vendor dashboard data:', error)
    throw error
  }
}

