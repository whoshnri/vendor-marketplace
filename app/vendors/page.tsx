'use client'

import { Star, Package } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { useEffect, useState } from 'react'
import { getVendors } from '@/app/actions/vendors'

interface Vendor {
  id: string
  userId: string
  name: string
  storeName: string
  description?: string
  image?: string
  rating: number
  totalSales: number
  isVerified: boolean
  itemCount: number
}

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadVendors = async () => {
      try {
        const data = await getVendors()
        setVendors(data)
      } catch (error) {
        console.error('Error loading vendors:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadVendors()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="container px-4 py-8 sm:px-8 md:py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Vendor Marketplace</h1>
            <p className="text-muted-foreground">
              Discover local vendors and their unique products
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading vendors...</p>
            </div>
          ) : vendors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No vendors found</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {vendors.map((vendor) => (
                <Link key={vendor.id} href={`/vendors/${vendor.userId}`}>
                  <Card className="h-full overflow-hidden border-secondary transition-all hover:border-primary hover:shadow-md">
                    <div className="aspect-video w-full overflow-hidden bg-secondary relative">
                      {vendor.image ? (
                        <Image
                          src={vendor.image}
                          alt={vendor.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                          <span className="text-4xl">🏪</span>
                        </div>
                      )}
                      {vendor.isVerified && (
                        <Badge className="absolute right-3 top-3 bg-green-500 text-white">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="line-clamp-2 text-lg font-semibold text-foreground">
                            {vendor.storeName}
                          </h3>
                          <p className="text-sm text-muted-foreground">{vendor.name}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 space-y-3">
                      {vendor.description && (
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {vendor.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-semibold text-foreground">{vendor.rating}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{vendor.totalSales} sales</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Package className="h-4 w-4" />
                        <span>{vendor.itemCount} products</span>
                      </div>
                    </CardContent>
                    <div className="border-t border-secondary p-4">
                      <Button className="w-full">View Store</Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

