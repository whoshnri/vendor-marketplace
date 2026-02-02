'use client'

import { useState } from 'react'
import { Search, Sliders, ShoppingCart, Star, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')

  const categories = [
    { id: 'all', name: 'All Items', count: 412 },
    { id: 'produce', name: 'Fresh Produce', count: 124 },
    { id: 'dairy', name: 'Dairy & Eggs', count: 45 },
    { id: 'bakery', name: 'Bakery', count: 67 },
    { id: 'prepared', name: 'Prepared Foods', count: 89 },
    { id: 'meat', name: 'Meat & Seafood', count: 54 },
    { id: 'beverages', name: 'Beverages', count: 33 },
  ]

  const allItems = [
    {
      id: '1',
      name: 'Organic Heirloom Tomatoes',
      vendor: 'Green Valley Farm',
      category: 'Produce',
      price: 5.99,
      rating: 4.8,
      reviews: 128,
      image: '/diverse-group.png',
      stock: 45,
      organic: true,
    },
    {
      id: '2',
      name: 'Free-Range Eggs (Dozen)',
      vendor: 'Sunny Side Farm',
      category: 'Dairy',
      price: 6.49,
      rating: 4.9,
      reviews: 95,
      image: '/diverse-person.png',
      stock: 32,
      organic: true,
    },
    {
      id: '3',
      name: 'Artisan Sourdough Bread',
      vendor: 'The Rising Loaf',
      category: 'Bakery',
      price: 7.99,
      rating: 4.7,
      reviews: 156,
      image: '/responsive-web-design.png',
      stock: 28,
      organic: false,
    },
    {
      id: '4',
      name: 'Organic Mixed Greens',
      vendor: 'Garden Fresh Co.',
      category: 'Produce',
      price: 3.49,
      rating: 4.6,
      reviews: 89,
      image: '/ecommerce-website-design.png',
      stock: 67,
      organic: true,
    },
    {
      id: '5',
      name: 'Greek Yogurt (500g)',
      vendor: 'Pastoral Creamery',
      category: 'Dairy',
      price: 4.99,
      rating: 4.8,
      reviews: 112,
      image: '/mobile-app-ui-design.png',
      stock: 41,
      organic: false,
    },
    {
      id: '6',
      name: 'Gluten-Free Pastries Mix',
      vendor: 'The Rising Loaf',
      category: 'Bakery',
      price: 12.99,
      rating: 4.5,
      reviews: 67,
      image: '/general-dashboard-interface.png',
      stock: 19,
      organic: false,
    },
    {
      id: '7',
      name: 'Fresh Strawberries',
      vendor: 'Green Valley Farm',
      category: 'Produce',
      price: 4.49,
      rating: 4.9,
      reviews: 203,
      image: '/modern-brand-identity.png',
      stock: 38,
      organic: true,
    },
    {
      id: '8',
      name: 'Grass-Fed Beef (1lb)',
      vendor: 'Local Harvest',
      category: 'Prepared',
      price: 15.99,
      rating: 4.7,
      reviews: 78,
      image: '/diverse-group-two.png',
      stock: 12,
      organic: true,
    },
  ]

  const filteredItems = allItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1]
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vendor.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesPrice && matchesSearch
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return b.id.localeCompare(a.id)
      default:
        return b.reviews - a.reviews
    }
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-secondary bg-background">
        <div className="container flex h-16 items-center gap-4 px-4 sm:px-8">
          <MainNav />
          <div className="relative hidden md:flex flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search items or vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
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
        <div className="container px-4 py-8 sm:px-8">
          {/* Mobile Search */}
          <div className="mb-6 md:hidden">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8"
              />
            </div>
          </div>

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Shop Fresh Food</h1>
            <p className="text-muted-foreground">
              Showing {sortedItems.length} of {allItems.length} items
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-[240px_1fr]">
            {/* Filters Sidebar */}
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-lg font-semibold">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-primary text-primary-foreground font-semibold'
                          : 'hover:bg-secondary text-foreground'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs opacity-75">({cat.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-3 text-lg font-semibold">Price Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Min Price</label>
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      min="0"
                      max="100"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Max Price</label>
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      min="0"
                      max="100"
                      className="mt-1"
                    />
                  </div>
                  <div className="text-sm font-semibold">
                    ${priceRange[0]} - ${priceRange[1]}
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-3 text-lg font-semibold">Filters</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">In Stock Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Organic Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Local Vendors</span>
                  </label>
                </div>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </div>

            {/* Items Grid */}
            <div>
              {/* Sort Options */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {sortedItems.length} items found
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Items */}
              {sortedItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-secondary bg-secondary/5 py-12">
                  <p className="text-lg font-semibold text-foreground">No items found</p>
                  <p className="text-muted-foreground">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {sortedItems.map((item) => (
                    <Link key={item.id} href={`/item/${item.id}`}>
                      <Card className="h-full border-secondary transition-all hover:border-primary hover:shadow-md overflow-hidden">
                        <div className="aspect-square w-full overflow-hidden bg-secondary relative">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                          {item.organic && (
                            <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
                              Organic
                            </Badge>
                          )}
                        </div>
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <h3 className="line-clamp-2 text-base font-semibold text-foreground">
                                {item.name}
                              </h3>
                              <p className="text-xs text-muted-foreground">{item.vendor}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-2 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-primary">
                              ${item.price.toFixed(2)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {item.stock} in stock
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            <span className="text-sm font-semibold text-foreground">
                              {item.rating}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ({item.reviews})
                            </span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 border-t border-secondary">
                          <Button className="w-full gap-2" size="sm">
                            <ShoppingCart className="h-3 w-3" />
                            Add to Cart
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-secondary bg-secondary/20 py-8">
        <div className="container px-4 text-center text-sm text-muted-foreground sm:px-8">
          <p>© 2024 FreshMarket. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
