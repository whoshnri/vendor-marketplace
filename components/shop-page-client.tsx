'use client'

import { useState, useCallback } from 'react'
import { Search, ShoppingCart, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'
import { getFoodItems } from '@/app/actions/food-items'
import { addToCart } from '@/app/actions/cart'

interface Category {
  id: string
  name: string
  slug: string
  image?: string
  count: number
}

interface FoodItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  stock: number
  rating: number
  reviews: number
  category: string
  categoryId: string
  vendor: string
  vendorId: string
  vendorImage?: string
}

interface ShopPageClientProps {
  categories: Category[]
}

export default function ShopPageClient({ categories }: ShopPageClientProps) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [items, setItems] = useState<FoodItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)

  const loadItems = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await getFoodItems({
        search: searchQuery,
        categoryId: selectedCategory === 'all' ? undefined : selectedCategory,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        sortBy: sortBy as any,
        take: 100,
      })
      setItems(result.items)
      setHasLoaded(true)
    } catch (error) {
      console.error('Error loading items:', error)
    } finally {
      setIsLoading(false)
    }
  }, [searchQuery, selectedCategory, priceRange, sortBy])

  // Load items on mount
  const handleFilterChange = useCallback(async () => {
    await loadItems()
  }, [loadItems])

  const handleAddToCart = async (e: React.MouseEvent, itemId: string) => {
    e.preventDefault()
    const result = await addToCart(itemId, 1)
    if (!result.ok) {
      router.push('/login')
    }
  }

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
              {hasLoaded && items.length > 0 ? `Showing ${items.length} items` : 'Start shopping'}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-[240px_1fr]">
            {/* Filters Sidebar */}
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-lg font-semibold">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('all')
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-primary text-primary-foreground font-semibold'
                        : 'hover:bg-secondary text-foreground'
                    }`}
                  >
                    <span>All Items</span>
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id)
                      }}
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
                <h3 className="mb-3 text-lg font-semibold">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              <Button className="w-full" onClick={handleFilterChange} disabled={isLoading}>
                {isLoading ? 'Applying...' : 'Apply Filters'}
              </Button>
            </div>

            {/* Items Grid */}
            <div>
              {/* Sort Options */}
              {hasLoaded && items.length > 0 && (
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{items.length} items found</p>
                </div>
              )}

              {/* Items */}
              {!hasLoaded ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-secondary bg-secondary/5 py-12">
                  <p className="text-lg font-semibold text-foreground">Apply filters to see items</p>
                  <p className="text-muted-foreground">Click the "Apply Filters" button to start shopping</p>
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-secondary bg-secondary/5 py-12">
                  <p className="text-lg font-semibold text-foreground">No items found</p>
                  <p className="text-muted-foreground">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <Link key={item.id} href={`/shop/${item.id}`}>
                      <Card className="h-full border-secondary transition-all hover:border-primary hover:shadow-md overflow-hidden">
                        <div className="aspect-square w-full overflow-hidden bg-secondary relative">
                          <Image
                            src={item.image || '/placeholder.svg'}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <h3 className="line-clamp-2 text-base font-semibold text-foreground">{item.name}</h3>
                              <p className="text-xs text-muted-foreground">{item.vendor}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-2 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-primary">${item.price.toFixed(2)}</span>
                            <span className="text-xs text-muted-foreground">{item.stock} in stock</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            <span className="text-sm font-semibold text-foreground">{item.rating}</span>
                            <span className="text-xs text-muted-foreground">({item.reviews})</span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 border-t border-secondary">
                          <Button className="w-full gap-2" size="sm" onClick={(e) => handleAddToCart(e, item.id)}>
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
