'use client'

import { use, useEffect, useState } from 'react'
import { Star, MapPin, Loader, ShoppingCart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { useToast } from '@/hooks/use-toast'
import { getVendorById } from '@/app/actions/vendors'
import { addToCart } from '@/app/actions/cart'
import { getCurrentUser } from '@/app/actions/auth'

interface VendorDetail {
  id: string
  userId: string
  name: string
  storeName: string
  description: string | null
  image: string | null
  rating: number
  totalSales: number
  earnings: number
  isVerified: boolean
  itemCount: number
  items: Array<{
    id: string
    name: string
    description: string
    price: number
    image: string
    stock: number
    rating: number
    reviews: number
    category: string
  }>
}

export default function VendorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const id = resolvedParams.id
  const [vendor, setVendor] = useState<VendorDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [addingToCart, setAddingToCart] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const loadVendor = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)

        const vendorData = await getVendorById(id)
        if (!vendorData) {
          toast({ title: 'Error', description: 'Vendor not found', variant: 'destructive' })
          router.push('/vendors')
          return
        }
        setVendor(vendorData as VendorDetail)
      } catch (error) {
        console.error('Error loading vendor:', error)
        toast({ title: 'Error', description: 'Failed to load vendor details', variant: 'destructive' })
      } finally {
        setLoading(false)
      }
    }

    loadVendor()
  }, [id, router, toast])

  const handleAddToCart = async (itemId: string) => {
    if (!user) {
      router.push('/login')
      return
    }

    setAddingToCart(itemId)
    try {
      const result = await addToCart(itemId, 1)
      if (result.ok) {
        toast({
          title: 'Added to cart',
          description: 'Item added successfully',
        })
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to add to cart',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add to cart',
        variant: 'destructive',
      })
    } finally {
      setAddingToCart(null)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </main>
      </div>
    )
  }

  if (!vendor) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Vendor not found</p>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-secondary">
          <div className="container px-4 py-4 sm:px-8">
            <Link href="/vendors" className="flex items-center gap-2 text-sm text-primary hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Back to Vendors
            </Link>
          </div>
        </div>

        {/* Vendor Header */}
        <section className="border-b border-secondary bg-gradient-to-br from-primary/5 via-background to-accent/5 py-8 md:py-12">
          <div className="container px-4 sm:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-8">
              {/* Vendor Image */}
              <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                {vendor.image ? (
                  <Image
                    src={vendor.image}
                    alt={vendor.storeName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                    <span className="text-5xl">🏪</span>
                  </div>
                )}
              </div>

              {/* Vendor Info */}
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{vendor.storeName}</h1>
                  {vendor.isVerified && (
                    <Badge className="bg-green-500 text-white">Verified</Badge>
                  )}
                </div>
                <p className="text-muted-foreground mb-4">{vendor.name}</p>

                <div className="flex flex-wrap gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-semibold text-lg">{vendor.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Sales</p>
                    <p className="font-semibold text-lg mt-1">{vendor.totalSales.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Products</p>
                    <p className="font-semibold text-lg mt-1">{vendor.itemCount}</p>
                  </div>
                  {vendor.earnings > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground">Total Earnings</p>
                      <p className="font-semibold text-lg mt-1">${vendor.earnings.toFixed(2)}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            {vendor.description && (
              <div className="mt-6 pt-6 border-t border-secondary">
                <h2 className="text-lg font-semibold mb-2">About This Store</h2>
                <p className="text-muted-foreground">{vendor.description}</p>
              </div>
            )}
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 sm:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold">Featured Products ({vendor.items.length})</h2>
              <p className="text-muted-foreground mt-1">Browse all products from {vendor.storeName}</p>
            </div>

            {vendor.items.length === 0 ? (
              <Card className="border-secondary">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No products available</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {vendor.items.map((item) => (
                  <Card key={item.id} className="border-secondary overflow-hidden transition-all hover:border-primary hover:shadow-md flex flex-col">
                    <div className="relative aspect-square w-full overflow-hidden bg-secondary">
                      <Image
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      {item.stock <= 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <span className="text-white font-semibold">Out of Stock</span>
                        </div>
                      )}
                      <Badge className="absolute right-2 top-2 bg-primary">
                        {item.category}
                      </Badge>
                    </div>

                    <CardHeader className="pb-2">
                      <h3 className="line-clamp-2 font-semibold text-foreground text-sm">
                        {item.name}
                      </h3>
                    </CardHeader>

                    <CardContent className="space-y-3 flex-1 flex flex-col">
                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-2 text-sm">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="font-semibold">{item.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground">({item.reviews})</span>
                      </div>

                      <div className="mt-auto space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">
                            ${item.price.toFixed(2)}
                          </span>
                          {item.stock > 0 && (
                            <span className="text-xs text-muted-foreground">
                              {item.stock} left
                            </span>
                          )}
                        </div>

                        <Button
                          onClick={() => handleAddToCart(item.id)}
                          disabled={item.stock <= 0 || addingToCart === item.id}
                          className="w-full gap-2"
                          size="sm"
                        >
                          {addingToCart === item.id ? (
                            <>
                              <Loader className="h-4 w-4 animate-spin" />
                              Adding...
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="h-4 w-4" />
                              Add to Cart
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
