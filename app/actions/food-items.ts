'use server'

import { prisma } from '@/lib/prisma'

export interface FoodItemsParams {
  categoryId?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  skip?: number
  take?: number
  sortBy?: 'popular' | 'newest' | 'price-low' | 'price-high' | 'rating'
}

export async function getFoodItems(params: FoodItemsParams) {
  const {
    categoryId,
    search,
    minPrice = 0,
    maxPrice = 100000,
    skip = 0,
    take = 40,
    sortBy = 'popular',
  } = params

  try {
    // Build the where clause
    const where: any = {}

    if (categoryId && categoryId !== 'all') {
      where.categoryId = categoryId
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    where.price = {
      gte: minPrice,
      lte: maxPrice,
    }

    where.stock = {
      gt: 0, // Only show items in stock
    }

    // Build the orderBy clause
    let orderBy: any = { createdAt: 'desc' }
    if (sortBy === 'newest') {
      orderBy = { createdAt: 'desc' }
    } else if (sortBy === 'price-low') {
      orderBy = { price: 'asc' }
    } else if (sortBy === 'price-high') {
      orderBy = { price: 'desc' }
    } else if (sortBy === 'rating') {
      orderBy = { rating: 'desc' }
    } else if (sortBy === 'popular') {
      orderBy = { reviews: { _count: 'desc' } }
    }

    const [items, total] = await Promise.all([
      prisma.foodItem.findMany({
        where,
        include: {
          category: true,
          vendor: {
            include: {
              vendorProfile: true,
            },
          },
          reviews: true,
        },
        orderBy,
        skip,
        take,
      }),
      prisma.foodItem.count({ where }),
    ])

    return {
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        stock: item.stock,
        rating: item.rating,
        reviews: item.reviews.length,
        category: item.category.name,
        categoryId: item.category.id,
        vendor: item.vendor.name,
        vendorId: item.vendorId,
        vendorImage: item.vendor.image || undefined,
        vendorProfile: item.vendor.vendorProfile || undefined,
      })),
      total,
      hasMore: skip + take < total,
    }
  } catch (error) {
    console.error('Error fetching food items:', error)
    throw error
  }
}

export async function getFoodItemsForHome(limit: number = 40) {
  try {
    const items = await prisma.foodItem.findMany({
      where: {
        stock: {
          gt: 0,
        },
      },
      include: {
        category: true,
        vendor: {
          include: {
            vendorProfile: true,
          },
        },
        reviews: true,
      },
      orderBy: [{ createdAt: 'desc' }],
      take: limit,
    })

    return items.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      stock: item.stock,
      rating: item.rating,
      reviews: item.reviews.length,
      category: item.category.name,
      categoryId: item.category.id,
      vendor: item.vendor.name,
      vendorId: item.vendorId,
      vendorImage: item.vendor.image || undefined,
      vendorProfile: item.vendor.vendorProfile || undefined,
    }))
  } catch (error) {
    console.error('Error fetching home food items:', error)
    throw error
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { items: true },
        },
      },
    })

    return categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      image: cat.image || undefined,
      count: cat._count.items,
    }))
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

export async function getFoodItemById(id: string) {
  try {
    const item = await prisma.foodItem.findUnique({
      where: { id },
      include: {
        category: true,
        vendor: {
          include: {
            vendorProfile: true,
          },
        },
        reviews: {
          include: {
            user: true,
          },
        },
      },
    })

    if (!item) return null

    return {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      stock: item.stock,
      rating: item.rating,
      category: item.category.name,
      categoryId: item.category.id,
      vendor: item.vendor.name,
      vendorId: item.vendorId,
      vendorImage: item.vendor.image,
      vendorProfile: item.vendor.vendorProfile,
      reviews: item.reviews.map((r) => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        createdAt: r.createdAt,
        user: {
          name: r.user.name,
          image: r.user.image,
        },
      })),
    }
  } catch (error) {
    console.error('Error fetching food item:', error)
    throw error
  }
}
