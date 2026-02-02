import { TabsContent } from "@/components/ui/tabs"
import { TabsTrigger } from "@/components/ui/tabs"
import { TabsList } from "@/components/ui/tabs"
import { Tabs } from "@/components/ui/tabs"
import { Search, Leaf, ShoppingCart, Filter, ChevronRight, Clock, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import FeaturedCourses from "@/components/featured-courses"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const foodCategories = [
  { id: "produce", name: "Fresh Produce", icon: "🥕", count: 124 },
  { id: "dairy", name: "Dairy & Eggs", icon: "🧈", count: 45 },
  { id: "bakery", name: "Bakery", icon: "🍞", count: 67 },
  { id: "prepared", name: "Prepared Foods", icon: "🍱", count: 89 },
]

const foodItems = [
  {
    id: "1",
    name: "Organic Heirloom Tomatoes",
    description: "Fresh, locally-grown heirloom tomatoes with vibrant color and flavor.",
    category: "Produce",
    vendor: "Green Valley Farm",
    price: 5.99,
    stock: 45,
    rating: 4.8,
    reviews: 128,
    image: "/diverse-group.png",
  },
  {
    id: "2",
    name: "Free-Range Eggs (Dozen)",
    description: "Happy hens, happy eggs. Pasture-raised and hormone-free.",
    category: "Dairy",
    vendor: "Sunny Side Farm",
    price: 6.49,
    stock: 32,
    rating: 4.9,
    reviews: 95,
    image: "/diverse-person.png",
  },
  {
    id: "3",
    name: "Artisan Sourdough Bread",
    description: "Handcrafted sourdough with a perfect crust and tangy flavor.",
    category: "Bakery",
    vendor: "The Rising Loaf",
    price: 7.99,
    stock: 28,
    rating: 4.7,
    reviews: 156,
    image: "/responsive-web-design.png",
  },
  {
    id: "4",
    name: "Organic Mixed Greens",
    description: "Crisp, fresh salad mix ready to eat. Harvested daily.",
    category: "Produce",
    vendor: "Garden Fresh Co.",
    price: 3.49,
    stock: 67,
    rating: 4.6,
    reviews: 89,
    image: "/ecommerce-website-design.png",
  },
  {
    id: "5",
    name: "Greek Yogurt (500g)",
    description: "Creamy, protein-rich yogurt made from local milk.",
    category: "Dairy",
    vendor: "Pastoral Creamery",
    price: 4.99,
    stock: 41,
    rating: 4.8,
    reviews: 112,
    image: "/mobile-app-ui-design.png",
  },
  {
    id: "6",
    name: "Gluten-Free Pastries Mix",
    description: "Delicious assorted pastries perfect for breakfast or snacks.",
    category: "Bakery",
    vendor: "The Rising Loaf",
    price: 12.99,
    stock: 19,
    rating: 4.5,
    reviews: 67,
    image: "/general-dashboard-interface.png",
  },
]

const tutorials = [
  {
    id: "2",
    title: "User Research Fundamentals",
    description:
      "Discover essential user research methods and techniques to inform your design decisions and create more user-centered products.",
    image: "/user-research-unsplash.jpg",
    type: "Tutorial",
    duration: "2h 15m",
    level: "Beginner",
    rating: 4.7,
    author: {
      name: "Jamie Chen",
      avatar: "/diverse-group-two.png",
    },
    categories: ["UX Design", "Research"],
  },
  {
    id: "3",
    title: "Advanced Typography for Digital Products",
    description:
      "Elevate your typography skills and learn how to create beautiful, readable, and accessible type systems for websites and apps.",
    image: "/typography-unsplash.jpg",
    type: "Course",
    duration: "3h 45m",
    level: "Advanced",
    rating: 4.8,
    author: {
      name: "Sam Wilson",
      avatar: "/diverse-group-outdoors.png",
    },
    categories: ["Typography", "UI Design"],
  },
  {
    id: "4",
    title: "Introduction to 3D Design with Blender",
    description:
      "Get started with 3D design using Blender. Learn the fundamentals of modeling, texturing, lighting, and rendering.",
    image: "/3d-design-unsplash.jpg",
    type: "Course",
    duration: "6h 20m",
    level: "Beginner",
    rating: 4.6,
    author: {
      name: "Taylor Reed",
      avatar: "/diverse-group-four.png",
    },
    categories: ["3D & Animation", "Design Tools"],
  },
  {
    id: "5",
    title: "Designing for Accessibility",
    description: "Learn how to create inclusive designs that work for everyone, including people with disabilities.",
    image: "/accessibility-unsplash.jpg",
    type: "Tutorial",
    duration: "1h 45m",
    level: "Intermediate",
    rating: 4.9,
    author: {
      name: "Jordan Lee",
      avatar: "/diverse-group-five.png",
    },
    categories: ["UI Design", "UX Design", "Accessibility"],
  },
  {
    id: "6",
    title: "Creating Effective Design Portfolios",
    description:
      "Learn how to showcase your work effectively and create a portfolio that helps you land your dream design job.",
    image: "/portfolio-unsplash.jpg",
    type: "Tutorial",
    duration: "2h 10m",
    level: "All Levels",
    rating: 4.7,
    author: {
      name: "Casey Kim",
      avatar: "/diverse-group-six.png",
    },
    categories: ["Career Advice", "Portfolio"],
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-secondary bg-background">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
          <MainNav />
          <div className="ml-auto flex items-center gap-4">
            <div className="relative hidden md:flex">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search food items..."
                className="w-[200px] pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
            <Link href="/sell">
              <Button variant="outline" size="sm">Become a Vendor</Button>
            </Link>
            <Link href="/cart">
              <Button size="icon" variant="outline">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </Link>
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-secondary bg-gradient-to-br from-primary/5 via-accent/5 to-background py-12 md:py-16">
          <div className="container px-4 sm:px-8">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                  Fresh Food, Straight to Your Door
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Buy farm-fresh produce, artisan goods, and homemade treats from local vendors. Support your community while enjoying quality food.
                </p>
                <div className="mt-8 flex gap-4">
                  <Button size="lg" className="gap-2">
                    Start Shopping <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Become a Vendor
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative h-64 w-full md:h-80">
                  <Image
                    src="/modern-brand-identity.png"
                    alt="Fresh vegetables"
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container px-4 py-8 sm:px-8 md:py-12">

          {/* Categories Section */}
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold">Shop by Category</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {foodCategories.map((category) => (
                <Link key={category.id} href={`/shop?category=${category.id}`}>
                  <Card className="h-full overflow-hidden border-secondary bg-gradient-to-br from-white to-secondary/30 transition-all hover:border-primary hover:shadow-md">
                    <div className="aspect-square w-full overflow-hidden bg-secondary">
                      <div className="flex h-full items-center justify-center text-4xl">{category.icon}</div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count} items</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          <div className="grid gap-8 md:grid-cols-[240px_1fr]">
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-lg font-semibold">Filter by Price</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input type="checkbox" id="price-0-10" className="mr-2" defaultChecked />
                    <label htmlFor="price-0-10" className="text-sm">
                      Under $10
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-10-25" className="mr-2" defaultChecked />
                    <label htmlFor="price-10-25" className="text-sm">
                      $10 - $25
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-25-50" className="mr-2" />
                    <label htmlFor="price-25-50" className="text-sm">
                      $25 - $50
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-50plus" className="mr-2" />
                    <label htmlFor="price-50plus" className="text-sm">
                      $50+
                    </label>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-3 text-lg font-semibold">Availability</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input type="checkbox" id="instock" className="mr-2" defaultChecked />
                    <label htmlFor="instock" className="text-sm">
                      In Stock
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="organic" className="mr-2" defaultChecked />
                    <label htmlFor="organic" className="text-sm">
                      Organic Only
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="local" className="mr-2" />
                    <label htmlFor="local" className="text-sm">
                      Local Vendors
                    </label>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="hidden md:block">
                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>

            <div>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold">Featured Items</h3>
                <Button variant="outline" size="sm" className="hidden md:flex gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  Sort
                </Button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {foodItems.map((item) => (
                  <Link key={item.id} href={`/item/${item.id}`}>
                    <Card className="h-full overflow-hidden border-secondary transition-all hover:border-primary hover:shadow-md">
                      <div className="aspect-square w-full overflow-hidden bg-secondary">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={300}
                          height={300}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h3 className="line-clamp-2 text-base font-semibold text-foreground">{item.name}</h3>
                            <p className="text-xs text-muted-foreground">{item.vendor}</p>
                          </div>
                          <Badge variant="secondary" className="shrink-0">{item.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <p className="line-clamp-1 text-sm text-muted-foreground mb-3">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-primary">${item.price.toFixed(2)}</span>
                          <span className="text-xs text-muted-foreground">{item.stock} in stock</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between p-4 pt-0">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-primary font-semibold">{item.rating}</span>
                          <span className="text-xs text-muted-foreground">({item.reviews} reviews)</span>
                        </div>
                        <Button size="sm" className="gap-1">
                          <ShoppingCart className="h-3 w-3" />
                          Add
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="gap-2 bg-transparent">
                  View All Items <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-secondary bg-secondary/20 py-12">
        <div className="container px-4 sm:px-8">
          <div className="grid gap-8 md:grid-cols-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-primary" />
                <span className="font-bold text-primary text-lg">FreshMarket</span>
              </div>
              <p className="text-sm text-muted-foreground">Connecting communities with fresh, local food.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Browse Items</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Categories</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Best Sellers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sell</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Become a Vendor</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Seller Guide</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Help Center</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
            <p className="text-sm text-muted-foreground">© 2024 FreshMarket. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
              <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
