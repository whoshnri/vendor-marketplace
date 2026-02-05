'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Leaf, ShoppingCart, ChevronRight, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { SiteFooter } from '@/components/site-footer'
import { getFoodItems } from '@/app/actions/food-items'
import { addToCart, getCart, updateCartItem } from '@/app/actions/cart'
import { getCurrentUser } from '@/app/actions/auth'

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

interface HomePageProps {
  initialCategories: Category[]
  initialItems: FoodItem[]
  totalItems: number
  hasMore: boolean
}

export default function HomePage({
  initialCategories,
  initialItems,
  totalItems,
  hasMore: initialHasMore,
}: HomePageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [items, setItems] = useState<FoodItem[]>(initialItems)
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdatingCart, setIsUpdatingCart] = useState(false)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'popular')
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({})
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isUserLoading, setIsUserLoading] = useState(true)

  const refreshCart = useCallback(async () => {
    const result = await getCart()
    if (!result.ok) {
      setCartQuantities({})
      return
    }
    const next: Record<string, number> = {}
    result.items.forEach((item) => {
      next[item.id] = item.quantity
    })
    setCartQuantities(next)
  }, [])

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser()
      setCurrentUser(user)
      setIsUserLoading(false)
    }
    fetchUser()
  }, [])

  const handleAddToCart = async (e: React.MouseEvent, itemId: string) => {
    e.preventDefault()
    e.stopPropagation()
    setIsUpdatingCart(true)
    const result = await addToCart(itemId, 1)
    if (!result.ok) {
      setIsUpdatingCart(false)
      router.push('/login')
      return
    }
    setCartQuantities((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }))
    setIsUpdatingCart(false)
  }

  const handleUpdateQuantity = async (
    e: React.MouseEvent,
    itemId: string,
    nextQuantity: number,
  ) => {
    e.preventDefault()
    e.stopPropagation()
    setIsUpdatingCart(true)
    const result = await updateCartItem(itemId, nextQuantity)
    if (!result.ok) {
      setIsUpdatingCart(false)
      router.push('/login')
      return
    }
    setCartQuantities((prev) => {
      const updated = { ...prev }
      if (nextQuantity <= 0) {
        delete updated[itemId]
      } else {
        updated[itemId] = nextQuantity
      }
      return updated
    })
    setIsUpdatingCart(false)
  }

  const handleSearch = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const params = new URLSearchParams()
      if (searchQuery) params.set('search', searchQuery)
      if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory)
      params.set('sort', sortBy)

      router.push(`/?${params.toString()}`)

      // Fetch filtered data
      setIsLoading(true)
      try {
        const result = await getFoodItems({
          search: searchQuery,
          categoryId: selectedCategory === 'all' ? undefined : selectedCategory,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          sortBy: sortBy as any,
          take: 40,
        })
        setItems(result.items)
        setHasMore(result.hasMore)
      } catch (error) {
        console.error('Error searching:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [searchQuery, selectedCategory, priceRange, sortBy, router]
  )

  const handleLoadMore = async () => {
    setIsLoading(true)
    try {
      const result = await getFoodItems({
        search: searchQuery,
        categoryId: selectedCategory === 'all' ? undefined : selectedCategory,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        sortBy: sortBy as any,
        skip: items.length,
        take: 40,
      })
      setItems((prev) => [...prev, ...result.items])
      setHasMore(result.hasMore)
    } catch (error) {
      console.error('Error loading more:', error)
    } finally {
      setIsLoading(false)
    }
  }

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {!isUserLoading && currentUser?.role !== 'VENDOR' && (
              <Link href="/sell">
                <Button variant="outline" size="sm">
                  Become a Vendor
                </Button>
              </Link>
            )}
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
                  Buy farm-fresh produce, artisan goods, and homemade treats from local vendors. Support your community
                  while enjoying quality food.
                </p>
                <div className="mt-8 flex gap-4">
                  <Link href="/shop">
                    <Button size="lg" className="gap-2">
                      Start Shopping <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/sell">
                    <Button size="lg" variant="outline">
                      Become a Vendor
                    </Button>
                  </Link>
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
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {initialCategories.map((category) => (
                <Link key={category.id} href={`/?category=${category.id}`}>
                  <Card className="h-full overflow-hidden border-secondary bg-gradient-to-br from-white to-secondary/30 transition-all hover:border-primary hover:shadow-md">
                    <div className="aspect-[4/3] w-full overflow-hidden bg-secondary sm:aspect-square">
                      <div className="flex h-full items-center justify-center text-3xl">
                        {category.image ? (
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          '🛒'
                        )}
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="text-sm font-semibold text-foreground sm:text-base">{category.name}</h3>
                      <p className="text-xs text-muted-foreground sm:text-sm">{category.count} items</p>
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
                    <input
                      type="checkbox"
                      id="price-0-10"
                      checked={priceRange[0] === 0 && priceRange[1] >= 10}
                      onChange={() => setPriceRange([0, 10])}
                      className="mr-2"
                    />
                    <label htmlFor="price-0-10" className="text-sm">
                      Under $10
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="price-10-25"
                      checked={priceRange[0] === 10 && priceRange[1] === 25}
                      onChange={() => setPriceRange([10, 25])}
                      className="mr-2"
                    />
                    <label htmlFor="price-10-25" className="text-sm">
                      $10 - $25
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="price-25-50"
                      checked={priceRange[0] === 25 && priceRange[1] === 50}
                      onChange={() => setPriceRange([25, 50])}
                      className="mr-2"
                    />
                    <label htmlFor="price-25-50" className="text-sm">
                      $25 - $50
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="price-50plus"
                      checked={priceRange[0] === 50}
                      onChange={() => setPriceRange([50, 1000])}
                      className="mr-2"
                    />
                    <label htmlFor="price-50plus" className="text-sm">
                      $50+
                    </label>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-3 text-lg font-semibold">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <Separator />

              <div className="hidden md:block">
                <Button className="w-full" onClick={handleSearch as any} disabled={isLoading}>
                  {isLoading ? 'Applying Filters...' : 'Apply Filters'}
                </Button>
              </div>
            </div>

            <div>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold">
                  Featured Items ({items.length} of {totalItems})
                </h3>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No items found. Try adjusting your filters.</p>
                </div>
              ) : (
                <>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => {
                      const quantityInCart = cartQuantities[item.id] || 0
                      return (
                      <Link key={item.id} href={`/shop/${item.id}`}>
                        <Card className="h-full overflow-hidden border-secondary transition-all hover:border-primary hover:shadow-md">
                          <div className="aspect-square w-full overflow-hidden bg-secondary">
                            <Image
                              src={item.image || '/placeholder.svg'}
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
                              <Badge variant="secondary" className="shrink-0">
                                {item.category}
                              </Badge>
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
                            {quantityInCart > 0 ? (
                              <div
                                className="flex items-center gap-2 rounded-md border border-secondary bg-secondary/50"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                }}
                              >
                                <button
                                  className="p-1 hover:bg-secondary"
                                  onClick={(e) => handleUpdateQuantity(e, item.id, quantityInCart - 1)}
                                  disabled={isUpdatingCart}
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-6 text-center text-sm font-semibold">{quantityInCart}</span>
                                <button
                                  className="p-1 hover:bg-secondary"
                                  onClick={(e) => handleUpdateQuantity(e, item.id, quantityInCart + 1)}
                                  disabled={isUpdatingCart || quantityInCart >= item.stock}
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                className="gap-1"
                                onClick={(e) => handleAddToCart(e, item.id)}
                                disabled={isUpdatingCart}
                              >
                                <ShoppingCart className="h-3 w-3" />
                                Add
                              </Button>
                            )}
                          </CardFooter>
                        </Card>
                      </Link>
                      )
                    })}
                  </div>

                  {hasMore && (
                    <div className="mt-8 flex justify-center">
                      <Button
                        variant="outline"
                        className="gap-2 bg-transparent"
                        onClick={handleLoadMore}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Loading...' : 'Load More Items'} <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
