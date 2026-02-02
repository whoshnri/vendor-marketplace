'use client'

import { TrendingUp, Package, DollarSign, Users, Plus, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'
import { Separator } from '@/components/ui/separator'

export default function VendorDashboard() {
  const stats = [
    {
      label: 'Total Sales',
      value: '$12,456.50',
      change: '+12.5%',
      icon: DollarSign,
    },
    {
      label: 'Active Products',
      value: '34',
      change: '+2',
      icon: Package,
    },
    {
      label: 'Orders This Month',
      value: '128',
      change: '+18%',
      icon: TrendingUp,
    },
    {
      label: 'Followers',
      value: '1,234',
      change: '+45',
      icon: Users,
    },
  ]

  const recentOrders = [
    {
      id: 'ORD-2024-001',
      customer: 'Alice Johnson',
      items: 'Organic Tomatoes x2',
      amount: '$11.98',
      status: 'Pending',
      date: 'Dec 19, 2024',
    },
    {
      id: 'ORD-2024-002',
      customer: 'Bob Smith',
      items: 'Mixed Greens x1',
      amount: '$3.49',
      status: 'Processing',
      date: 'Dec 18, 2024',
    },
    {
      id: 'ORD-2024-003',
      customer: 'Carol Davis',
      items: 'Greek Yogurt x3',
      amount: '$14.97',
      status: 'Shipped',
      date: 'Dec 17, 2024',
    },
    {
      id: 'ORD-2024-004',
      customer: 'David Wilson',
      items: 'Sourdough Bread x1',
      amount: '$7.99',
      status: 'Delivered',
      date: 'Dec 16, 2024',
    },
  ]

  const topProducts = [
    {
      id: '1',
      name: 'Organic Heirloom Tomatoes',
      sales: 234,
      revenue: '$1,401.66',
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Mixed Greens',
      sales: 189,
      revenue: '$659.61',
      rating: 4.6,
    },
    {
      id: '3',
      name: 'Greek Yogurt',
      sales: 156,
      revenue: '$778.44',
      rating: 4.8,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Processing':
        return 'bg-blue-100 text-blue-800'
      case 'Shipped':
        return 'bg-purple-100 text-purple-800'
      case 'Delivered':
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
              <p className="text-muted-foreground">Welcome back, Green Valley Farm</p>
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
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between rounded-lg border border-secondary p-4">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                          <p className="text-xs text-muted-foreground mt-1">{order.items}</p>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="font-semibold text-primary">{order.amount}</p>
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
                    {topProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between border-b border-secondary pb-4 last:border-0">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{product.name}</p>
                          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                            <span>{product.sales} sold</span>
                            <span>Rating: {product.rating}</span>
                          </div>
                        </div>
                        <p className="text-lg font-bold text-primary">{product.revenue}</p>
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
                    {[
                      { name: 'Organic Heirloom Tomatoes', stock: 45, threshold: 20, status: 'Good' },
                      { name: 'Mixed Greens', stock: 12, threshold: 20, status: 'Low' },
                      { name: 'Greek Yogurt', stock: 41, threshold: 25, status: 'Good' },
                      { name: 'Sourdough Bread', stock: 8, threshold: 15, status: 'Critical' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b border-secondary pb-4 last:border-0">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{item.name}</p>
                          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                            <div
                              className={`h-full ${
                                item.status === 'Critical'
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

      <footer className="border-t border-secondary bg-secondary/20 py-8">
        <div className="container px-4 text-center text-sm text-muted-foreground sm:px-8">
          <p>© 2024 FreshMarket. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
