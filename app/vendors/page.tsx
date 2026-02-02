'use client'

import { Star, MapPin, Package } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export default function VendorsPage() {
  const vendors = [
    {
      id: '1',
      name: 'Green Valley Farm',
      category: 'Fresh Produce',
      location: 'Ojai, CA',
      rating: 4.8,
      reviews: 245,
      items: 34,
      image: '/diverse-group.png',
      description: 'Organic produce grown with love and care',
      verified: true,
    },
    {
      id: '2',
      name: 'Sunny Side Farm',
      category: 'Dairy & Eggs',
      location: 'Petaluma, CA',
      rating: 4.9,
      reviews: 189,
      items: 12,
      image: '/diverse-person.png',
      description: 'Free-range eggs and artisan dairy products',
      verified: true,
    },
    {
      id: '3',
      name: 'The Rising Loaf',
      category: 'Bakery',
      location: 'San Francisco, CA',
      rating: 4.7,
      reviews: 312,
      items: 22,
      image: '/responsive-web-design.png',
      description: 'Handcrafted bread and pastries made daily',
      verified: true,
    },
    {
      id: '4',
      name: 'Garden Fresh Co.',
      category: 'Fresh Produce',
      location: 'Santa Cruz, CA',
      rating: 4.6,
      reviews: 156,
      items: 28,
      image: '/ecommerce-website-design.png',
      description: 'Year-round fresh vegetables and greens',
      verified: true,
    },
    {
      id: '5',
      name: 'Pastoral Creamery',
      category: 'Dairy & Eggs',
      location: 'Marin County, CA',
      rating: 4.8,
      reviews: 203,
      items: 15,
      image: '/mobile-app-ui-design.png',
      description: 'Award-winning artisan dairy products',
      verified: true,
    },
    {
      id: '6',
      name: 'Local Harvest',
      category: 'Mixed',
      location: 'Berkeley, CA',
      rating: 4.5,
      reviews: 98,
      items: 45,
      image: '/general-dashboard-interface.png',
      description: 'Community-supported agriculture program',
      verified: false,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-secondary bg-background">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
          <MainNav />
          <UserNav />
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-8 sm:px-8 md:py-12">
          <div className="mb-12">
            <h1 className="text-3xl font-bold">Our Vendors</h1>
            <p className="text-muted-foreground">Support local farmers and food artisans</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4 md:space-y-0 md:flex md:gap-4">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search vendors..."
                className="w-full"
              />
            </div>
            <select className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground md:w-[200px]">
              <option>All Categories</option>
              <option>Fresh Produce</option>
              <option>Dairy & Eggs</option>
              <option>Bakery</option>
              <option>Mixed</option>
            </select>
          </div>

          <Separator className="mb-8" />

          {/* Vendors Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vendors.map((vendor) => (
              <Link key={vendor.id} href={`/vendors/${vendor.id}`}>
                <Card className="h-full border-secondary transition-all hover:border-primary hover:shadow-md overflow-hidden">
                  <div className="relative h-40 w-full overflow-hidden bg-secondary">
                    <Image
                      src={vendor.image || "/placeholder.svg"}
                      alt={vendor.name}
                      fill
                      className="object-cover"
                    />
                    {vendor.verified && (
                      <Badge className="absolute right-3 top-3 bg-primary text-primary-foreground">Verified</Badge>
                    )}
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <h3 className="line-clamp-1 text-lg font-semibold text-foreground">{vendor.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{vendor.location}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 p-4 pt-0">
                    <p className="line-clamp-2 text-sm text-muted-foreground">{vendor.description}</p>

                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">{vendor.category}</Badge>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="font-semibold">{vendor.rating}</span>
                        <span className="text-muted-foreground">({vendor.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground border-t border-secondary pt-3">
                      <Package className="h-4 w-4" />
                      <span>{vendor.items} products</span>
                    </div>

                    <Button className="w-full bg-transparent" variant="outline" size="sm">
                      View Store
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-16 rounded-lg border border-secondary bg-secondary/20 p-8 text-center">
            <h2 className="mb-8 text-2xl font-bold">Supporting Local Food Systems</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <div className="text-3xl font-bold text-primary">{vendors.length}+</div>
                <p className="text-muted-foreground">Active Vendors</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">{vendors.reduce((sum, v) => sum + v.items, 0)}+</div>
                <p className="text-muted-foreground">Fresh Products</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">{vendors.length * 8} miles</div>
                <p className="text-muted-foreground">Average Delivery Distance</p>
              </div>
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
