'use client'

import { Plus, Edit2, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'
import { Separator } from '@/components/ui/separator'

export default function VendorProducts() {
  const products = [
    {
      id: '1',
      name: 'Organic Heirloom Tomatoes',
      category: 'Produce',
      price: 5.99,
      stock: 45,
      status: 'Active',
      sales: 234,
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Mixed Greens',
      category: 'Produce',
      price: 3.49,
      stock: 12,
      status: 'Active',
      sales: 189,
      rating: 4.6,
    },
    {
      id: '3',
      name: 'Greek Yogurt',
      category: 'Dairy',
      price: 4.99,
      stock: 41,
      status: 'Active',
      sales: 156,
      rating: 4.8,
    },
    {
      id: '4',
      name: 'Fresh Strawberries',
      category: 'Produce',
      price: 4.49,
      stock: 0,
      status: 'Out of Stock',
      sales: 203,
      rating: 4.9,
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
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Products</h1>
              <p className="text-muted-foreground">Manage your product catalog</p>
            </div>
            <Link href="/vendor/products/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </Link>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 space-y-4 md:flex md:gap-4 md:space-y-0">
            <Input
              type="search"
              placeholder="Search products..."
              className="flex-1"
            />
            <select className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground md:w-[150px]">
              <option>All Status</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Out of Stock</option>
            </select>
          </div>

          <Separator className="mb-6" />

          {/* Products Table */}
          <Card className="border-secondary">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-secondary">
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Product</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Category</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Price</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Stock</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Sales</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Status</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-secondary hover:bg-secondary/30 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-foreground">{product.name}</p>
                            <p className="text-xs text-muted-foreground">Rating: {product.rating}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{product.category}</td>
                        <td className="px-6 py-4 font-semibold text-primary">${product.price.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-sm font-medium ${
                              product.stock > 20
                                ? 'text-green-600'
                                : product.stock > 5
                                  ? 'text-yellow-600'
                                  : 'text-red-600'
                            }`}
                          >
                            {product.stock} units
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{product.sales}</td>
                        <td className="px-6 py-4">
                          <Badge
                            className={
                              product.status === 'Active'
                                ? 'bg-green-100 text-green-800'
                                : product.status === 'Draft'
                                  ? 'bg-gray-100 text-gray-800'
                                  : 'bg-red-100 text-red-800'
                            }
                            variant="outline"
                          >
                            {product.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
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
