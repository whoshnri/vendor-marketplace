import { PrismaClient } from "../lib/generated/prisma/client"
import { randomBytes, scryptSync } from "node:crypto"
import { prisma } from '@/lib/prisma'


function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex")
  const hash = scryptSync(password, salt, 32).toString("hex")
  return `${salt}:${hash}`
}

async function main() {
  const existingCategories = await prisma.category.count()

  if (existingCategories === 0) {
    const categories = [
      { name: "Fresh Produce", slug: "produce" },
      { name: "Dairy & Eggs", slug: "dairy" },
      { name: "Bakery", slug: "bakery" },
      { name: "Prepared Foods", slug: "prepared" },
      { name: "Meat & Seafood", slug: "meat" },
      { name: "Beverages", slug: "beverages" },
    ]

    for (const category of categories) {
      await prisma.category.create({
        data: {
          ...category,
          image: null,
        },
      })
    }
  }

  const vendorEmail = "vendor@example.com"
  const buyerEmail = "buyer@example.com"

  const vendor = await prisma.user.upsert({
    where: { email: vendorEmail },
    update: {},
    create: {
      name: "Fresh Fields Co.",
      email: vendorEmail,
      password: hashPassword("password123"),
      role: "VENDOR",
      vendorProfile: {
        create: {
          storeName: "Fresh Fields Market",
          description: "Seasonal produce, artisan goods, and local favorites.",
          image: null,
          isVerified: true,
        },
      },
    },
  })

  const buyer = await prisma.user.upsert({
    where: { email: buyerEmail },
    update: {},
    create: {
      name: "Jamie Buyer",
      email: buyerEmail,
      password: hashPassword("password123"),
      role: "BUYER",
      cart: { create: {} },
    },
  })

  const categoryMap = await prisma.category.findMany()
  const bySlug = new Map(categoryMap.map((c) => [c.slug, c]))

  const existingItems = await prisma.foodItem.count()
  if (existingItems === 0) {
    const items = [
      {
        name: "Organic Heirloom Tomatoes",
        description: "Fresh, locally-grown tomatoes with vibrant flavor.",
        price: 5.99,
        image: "/diverse-group.png",
        stock: 45,
        categorySlug: "produce",
      },
      {
        name: "Free-Range Eggs (Dozen)",
        description: "Pasture-raised, hormone-free eggs.",
        price: 6.49,
        image: "/diverse-person.png",
        stock: 32,
        categorySlug: "dairy",
      },
      {
        name: "Artisan Sourdough Bread",
        description: "Handcrafted sourdough with a crisp crust.",
        price: 7.99,
        image: "/responsive-web-design.png",
        stock: 28,
        categorySlug: "bakery",
      },
      {
        name: "Organic Mixed Greens",
        description: "Crisp salad mix harvested daily.",
        price: 3.49,
        image: "/ecommerce-website-design.png",
        stock: 67,
        categorySlug: "produce",
      },
      {
        name: "Greek Yogurt (500g)",
        description: "Creamy, protein-rich yogurt made locally.",
        price: 4.99,
        image: "/mobile-app-ui-design.png",
        stock: 41,
        categorySlug: "dairy",
      },
      {
        name: "Cold Brew Coffee",
        description: "Smooth, small-batch cold brew concentrate.",
        price: 8.5,
        image: "/general-dashboard-interface.png",
        stock: 22,
        categorySlug: "beverages",
      },
    ]

    for (const item of items) {
      const category = bySlug.get(item.categorySlug)
      if (!category) continue
      await prisma.foodItem.create({
        data: {
          name: item.name,
          description: item.description,
          price: item.price,
          image: item.image,
          stock: item.stock,
          categoryId: category.id,
          vendorId: vendor.id,
        },
      })
    }
  }

  const cart = await prisma.cart.upsert({
    where: { userId: buyer.id },
    update: {},
    create: { userId: buyer.id },
  })

  const cartItems = await prisma.cartItem.findMany({ where: { cartId: cart.id } })
  if (cartItems.length === 0) {
    const [firstItem] = await prisma.foodItem.findMany({ take: 1 })
    if (firstItem) {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          itemId: firstItem.id,
          quantity: 2,
          price: firstItem.price,
        },
      })
    }
  }

  const orderCount = await prisma.order.count({ where: { userId: buyer.id } })
  if (orderCount === 0) {
    const orderItems = await prisma.foodItem.findMany({ take: 2 })
    if (orderItems.length > 0) {
      const total = orderItems.reduce((sum, it) => sum + it.price, 0)
      await prisma.order.create({
        data: {
          userId: buyer.id,
          totalPrice: total,
          status: "DELIVERED",
          paymentStatus: "PAID",
          items: {
            create: orderItems.map((it) => ({
              itemId: it.id,
              quantity: 1,
              price: it.price,
            })),
          },
        },
      })
    }
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
