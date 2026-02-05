'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, Package, DollarSign, Users, Plus, MoreHorizontal, Loader } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'
import { Separator } from '@/components/ui/separator'
import { SiteFooter } from '@/components/site-footer'
import { getVendorDashboardData } from '@/app/actions/vendors'

export default function VendorDashboard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const dashboardData = await getVendorDashboardData()
        setData(dashboardData)
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b border-secondary bg-background">
          <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
            <MainNav />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </main>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b border-secondary bg-background">
          <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
            <MainNav />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Failed to load dashboard data. Please make sure you are logged in as a vendor.</p>
        </main>
      </div>
    )
  }

  const { vendorProfile, stats: rawStats, recentOrders, topProducts, inventory } = data

  const stats = [
    {
      label: 'Total Sales',
      value: `${rawStats.totalSales}`,
      change: '--',
      icon: DollarSign,
    },
    {
      label: 'Total Earnings',
      value: `$${rawStats.earnings.toFixed(2)}`,
      change: '--',
      icon: DollarSign,
    },
    {
      label: 'Active Products',
      value: `${rawStats.activeProducts}`,
      change: '--',
      icon: Package,
    },
    {
      label: 'Recent Activity',
      value: `${rawStats.ordersThisMonth}`,
      change: '--',
      icon: TrendingUp,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800'
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-800'
      case 'DELIVERED':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

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
              <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {vendorProfile.storeName}</p>
            </div>
            <Link href="/vendor/products/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <Card key={idx} className="border-secondary">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                        <p className="mt-1 text-xs text-primary">{stat.change} from last month</p>
                      </div>
                      <Icon className="h-8 w-8 text-primary/30" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Separator className="my-8" />

          {/* Tabs */}
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="mb-6 w-full justify-start border-b border-secondary bg-transparent">
              <TabsTrigger value="orders" className="border-b-2 border-transparent data-[state=active]:border-primary">
                Recent Orders
              </TabsTrigger>
              <TabsTrigger value="products" className="border-b-2 border-transparent data-[state=active]:border-primary">
                Top Products
              </TabsTrigger>
              <TabsTrigger value="inventory" className="border-b-2 border-transparent data-[state=active]:border-primary">
                Inventory
              </TabsTrigger>
            </TabsList>

            {/* Recent Orders Tab */}
            <TabsContent value="orders" className="space-y-4">
              <Card className="border-secondary">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Recent Orders</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order: any) => (
                      <div key={order.id} className="flex items-center justify-between rounded-lg border border-secondary p-4">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                          <p className="text-xs text-muted-foreground mt-1">{order.items}</p>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="font-semibold text-primary">${order.amount.toFixed(2)}</p>
                          <Badge className={getStatusColor(order.status)} variant="outline">
                            {order.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{order.date}</p>
                        </div>
                        <Button size="icon" variant="ghost" className="ml-4">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Top Products Tab */}
            <TabsContent value="products" className="space-y-4">
              <Card className="border-secondary">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Top Performing Products</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product: any) => (
                      <div key={product.id} className="flex items-center justify-between border-b border-secondary pb-4 last:border-0">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{product.name}</p>
                          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                            <span>{product.sales} sold</span>
                            <span>Rating: {product.rating}</span>
                          </div>
                        </div>
                        <p className="text-lg font-bold text-primary">${product.revenue.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Inventory Tab */}
            <TabsContent value="inventory" className="space-y-4">
              <Card className="border-secondary">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Inventory Status</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inventory.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between border-b border-secondary pb-4 last:border-0">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{item.name}</p>
                          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                            <div
                              className={`h-full ${item.status === 'Critical'
                                ? 'bg-red-500'
                                : item.status === 'Low'
                                  ? 'bg-yellow-500'
                                  : 'bg-primary'
                                }`}
                              style={{ width: `${(item.stock / 50) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="ml-4 text-right">
                          <p className="font-semibold">{item.stock} units</p>
                          <Badge
                            variant="outline"
                            className={
                              item.status === 'Critical'
                                ? 'bg-red-100 text-red-800'
                                : item.status === 'Low'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
