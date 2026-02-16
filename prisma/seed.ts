import { randomBytes, scryptSync } from "node:crypto"
import { prisma } from '@/lib/prisma'


function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex")
  const hash = scryptSync(password, salt, 32).toString("hex")
  return `${salt}:${hash}`
}

async function main() {
  // Clear existing items to allow re-seeding with healthy data
  await prisma.cartItem.deleteMany()
  await prisma.foodItem.deleteMany()
  await prisma.vendorProfile.deleteMany()
  // Note: We keep users and categories but upsert them

  const existingCategories = await prisma.category.count()
  if (existingCategories === 0) {
    const categories = [
      { name: "Fresh Produce", slug: "produce", image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=2070&auto=format&fit=crop" },
      { name: "Dairy & Eggs", slug: "dairy", image: "https://images.unsplash.com/photo-1550583724-125581f7704b?q=80&w=1974&auto=format&fit=crop" },
      { name: "Bakery", slug: "bakery", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop" },
      { name: "Prepared Foods", slug: "prepared", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop" },
      { name: "Meat & Seafood", slug: "meat", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2070&auto=format&fit=crop" },
      { name: "Beverages", slug: "beverages", image: "https://images.unsplash.com/photo-1544145945-f904253db0ad?q=80&w=1974&auto=format&fit=crop" },
    ]

    for (const category of categories) {
      await prisma.category.create({
        data: {
          name: category.name,
          slug: category.slug,
          image: category.image,
        },
      })
    }
  }

  const buyerEmail = "buyer@example.com"

  const vendors = [
    {
      name: "Green Valley Farm",
      email: "greenvalley@example.com",
      storeName: "Green Valley Organics",
      description: "Organic produce grown with love in the heart of the valley.",
    },
    {
      name: "Artisan Bakeshop",
      email: "bakery@example.com",
      storeName: "The Daily Crust",
      description: "Traditional sourdough and sweet pastries baked fresh every morning.",
    },
    {
      name: "Coastal Catch",
      email: "seafood@example.com",
      storeName: "Ocean's Bounty",
      description: "Sustainable, wild-caught seafood from local waters.",
    },
    {
      name: "Dairy Delights",
      email: "dairy@example.com",
      storeName: "Pasture Path Dairy",
      description: "Pure, wholesome dairy and eggs from grass-fed herds.",
    }
  ]

  const vendorRecords = []
  for (const v of vendors) {
    const record = await prisma.user.upsert({
      where: { email: v.email },
      update: {},
      create: {
        name: v.name,
        email: v.email,
        password: hashPassword("password123"),
        role: "VENDOR",
        vendorProfile: {
          create: {
            storeName: v.storeName,
            description: v.description,
            isVerified: true,
          },
        },
      },
    })
    vendorRecords.push(record)
  }

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
        description: "Vibrant, sun-ripened tomatoes with exceptional flavor.",
        price: 599,
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=2070&auto=format&fit=crop",
        stock: 45,
        categorySlug: "produce",
        vendorEmail: "greenvalley@example.com"
      },
      {
        name: "Organic Carrots (Bunch)",
        description: "Fresh, crunchy carrots with greens attached. Perfect for snacking or roasting.",
        price: 349,
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=1974&auto=format&fit=crop",
        stock: 60,
        categorySlug: "produce",
        vendorEmail: "greenvalley@example.com"
      },
      {
        name: "Fresh Baby Spinach",
        description: "Triple-washed, tender organic spinach leaves.",
        price: 499,
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=2070&auto=format&fit=crop",
        stock: 30,
        categorySlug: "produce",
        vendorEmail: "greenvalley@example.com"
      },
      {
        name: "Hass Avocados (3pk)",
        description: "Creamy, perfectly ripe avocados for your toast and salads.",
        price: 699,
        image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=1975&auto=format&fit=crop",
        stock: 25,
        categorySlug: "produce",
        vendorEmail: "greenvalley@example.com"
      },
      {
        name: "Artisan Sourdough Loaf",
        description: "Slow-fermented bread with a crisp crust and airy crumb.",
        price: 850,
        image: "https://images.unsplash.com/photo-1585478259715-876a23d1ffbb?q=80&w=2070&auto=format&fit=crop",
        stock: 20,
        categorySlug: "bakery",
        vendorEmail: "bakery@example.com"
      },
      {
        name: "Butter Croissants (4pk)",
        description: "Flaky, golden-brown croissants made with pure butter.",
        price: 1200,
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1926&auto=format&fit=crop",
        stock: 15,
        categorySlug: "bakery",
        vendorEmail: "bakery@example.com"
      },
      {
        name: "Blueberry Muffins (6pk)",
        description: "Bursting with fresh berries and topped with a light crumble.",
        price: 1450,
        image: "https://images.unsplash.com/photo-1607958996333-41aef7ca3a5d?q=80&w=2070&auto=format&fit=crop",
        stock: 12,
        categorySlug: "bakery",
        vendorEmail: "bakery@example.com"
      },
      {
        name: "Free-Range Large Eggs",
        description: "Dozen pasture-raised eggs from healthy, happy hens.",
        price: 799,
        image: "https://images.unsplash.com/photo-1506976781803-b376d61974de?q=80&w=2070&auto=format&fit=crop",
        stock: 50,
        categorySlug: "dairy",
        vendorEmail: "dairy@example.com"
      },
      {
        name: "Organic Whole Milk",
        description: "Creamy, grass-fed whole milk from local family farms.",
        price: 549,
        image: "https://images.unsplash.com/photo-1550583724-125581f7704b?q=80&w=1974&auto=format&fit=crop",
        stock: 40,
        categorySlug: "dairy",
        vendorEmail: "dairy@example.com"
      },
      {
        name: "Greek Style Yogurt",
        description: "Thick, protein-rich yogurt in a 500g tub.",
        price: 625,
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1974&auto=format&fit=crop",
        stock: 35,
        categorySlug: "dairy",
        vendorEmail: "dairy@example.com"
      },
      {
        name: "Artisan Goat Cheese",
        description: "Soft, tangy fresh goat cheese log. Great for appetizers.",
        price: 950,
        image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?q=80&w=2074&auto=format&fit=crop",
        stock: 18,
        categorySlug: "dairy",
        vendorEmail: "dairy@example.com"
      },
      {
        name: "Wild Alaskan Salmon Fillet",
        description: "Wild-caught, rich in Omega-3s. Sustainably harvested.",
        price: 1899,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1974&auto=format&fit=crop",
        stock: 15,
        categorySlug: "meat",
        vendorEmail: "seafood@example.com"
      },
      {
        name: "Grass-Fed Ribeye Steak",
        description: "Well-marbled, tender steak from grass-fed beef.",
        price: 2450,
        image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?q=80&w=2070&auto=format&fit=crop",
        stock: 10,
        categorySlug: "meat",
        vendorEmail: "seafood@example.com"
      },
      {
        name: "Cold Brew Coffee",
        description: "Smooth, bold cold brew concentrate in a 32oz bottle.",
        price: 1299,
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1974&auto=format&fit=crop",
        stock: 25,
        categorySlug: "beverages",
        vendorEmail: "bakery@example.com"
      },
      {
        name: "Raw Wildflower Honey",
        description: "Pure, unfiltered honey from local beehives.",
        price: 1150,
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=2070&auto=format&fit=crop",
        stock: 30,
        categorySlug: "produce",
        vendorEmail: "greenvalley@example.com"
      },
      {
        name: "Artisan Pasta Salad",
        description: "Freshly prepared pesto pasta with seasonal veggies.",
        price: 999,
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2147&auto=format&fit=crop",
        stock: 20,
        categorySlug: "prepared",
        vendorEmail: "bakery@example.com"
      },
      {
        name: "Roasted Whole Chicken",
        description: "Herb-rubbed, rotisserie style chicken. Ready to eat.",
        price: 1650,
        image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=1974&auto=format&fit=crop",
        stock: 8,
        categorySlug: "prepared",
        vendorEmail: "greenvalley@example.com"
      },
      {
        name: "Raspberry Kombucha",
        description: "Effervescent, probiotic-rich tea with organic berries.",
        price: 450,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=2048&auto=format&fit=crop",
        stock: 40,
        categorySlug: "beverages",
        vendorEmail: "greenvalley@example.com"
      },
      {
        name: "Fresh Braeburn Apples",
        description: "Crisp and sweet-tart apples, locally grown.",
        price: 199,
        image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=2070&auto=format&fit=crop",
        stock: 100,
        categorySlug: "produce",
        vendorEmail: "greenvalley@example.com"
      },
      {
        name: "Sparkling Lemonade",
        description: "Old-fashioned lemonade with a fizzy twist.",
        price: 399,
        image: "https://images.unsplash.com/photo-1523677012304-354bd8c0f580?q=80&w=2070&auto=format&fit=crop",
        stock: 35,
        categorySlug: "beverages",
        vendorEmail: "dairy@example.com"
      }
    ]

    for (const item of items) {
      const category = bySlug.get(item.categorySlug)
      const v = vendorRecords.find(vr => vr.email === item.vendorEmail)
      if (!category || !v) continue
      await prisma.foodItem.create({
        data: {
          name: item.name,
          description: item.description,
          price: item.price,
          image: item.image,
          stock: item.stock,
          categoryId: category.id,
          vendorId: v.id,
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
