'use client'

import { PackageOpen, Clock, Check, Truck } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'
import { Separator } from '@/components/ui/separator'

export default function OrdersPage() {
  const orders = [
    {
      id: 'FRM-001',
      date: 'Dec 15, 2024',
      status: 'delivered',
      total: 24.47,
      items: [
        { name: 'Organic Heirloom Tomatoes', qty: 2, price: 5.99 },
        { name: 'Free-Range Eggs (Dozen)', qty: 1, price: 6.49 },
      ],
      estimatedDelivery: null,
    },
    {
      id: 'FRM-002',
      date: 'Dec 18, 2024',
      status: 'in-transit',
      total: 18.48,
      items: [
        { name: 'Artisan Sourdough Bread', qty: 2, price: 7.99 },
      ],
      estimatedDelivery: 'Dec 20, 2024',
    },
    {
      id: 'FRM-003',
      date: 'Dec 19, 2024',
      status: 'processing',
      total: 9.98,
      items: [
        { name: 'Organic Mixed Greens', qty: 2, price: 3.49 },
      ],
      estimatedDelivery: 'Dec 21, 2024',
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Check className="h-4 w-4" />
      case 'in-transit':
        return <Truck className="h-4 w-4" />
      case 'processing':
        return <Clock className="h-4 w-4" />
      default:
        return <PackageOpen className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'in-transit':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Your Orders</h1>
            <p className="text-muted-foreground">Track and manage all your orders</p>
          </div>

          {orders.length === 0 ? (
            <Card className="border-secondary">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <PackageOpen className="mb-4 h-12 w-12 text-muted-foreground" />
                <h2 className="text-xl font-semibold">No orders yet</h2>
                <p className="mb-6 text-muted-foreground">Start shopping to create your first order</p>
                <Link href="/">
                  <Button>Continue Shopping</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6 w-full justify-start border-b border-secondary bg-transparent">
                <TabsTrigger value="all" className="border-b-2 border-transparent data-[state=active]:border-primary">All Orders</TabsTrigger>
                <TabsTrigger value="processing" className="border-b-2 border-transparent data-[state=active]:border-primary">Processing</TabsTrigger>
                <TabsTrigger value="shipped" className="border-b-2 border-transparent data-[state=active]:border-primary">Shipped</TabsTrigger>
                <TabsTrigger value="delivered" className="border-b-2 border-transparent data-[state=active]:border-primary">Delivered</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="border-secondary overflow-hidden">
                    <CardHeader className="border-b border-secondary bg-secondary/30 px-6 py-4">
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">Order {order.id}</h3>
                            <Badge variant="outline" className={getStatusColor(order.status)}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1">{getStatusLabel(order.status)}</span>
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                        </div>
                        <Button variant="outline" size="sm">Track Order</Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between border-b border-secondary pb-4 last:border-0">
                            <div>
                              <p className="font-medium text-foreground">{item.name}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.qty}</p>
                            </div>
                            <p className="font-semibold text-foreground">${(item.price * item.qty).toFixed(2)}</p>
                          </div>
                        ))}
                        <div className="pt-4">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold">Order Total</p>
                            <p className="text-lg font-bold text-primary">${order.total.toFixed(2)}</p>
                          </div>
                          {order.estimatedDelivery && (
                            <p className="text-sm text-muted-foreground mt-2">Est. Delivery: {order.estimatedDelivery}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="processing" className="space-y-4">
                {orders
                  .filter((o) => o.status === 'processing')
                  .map((order) => (
                    <Card key={order.id} className="border-secondary">
                      <CardHeader className="border-b border-secondary">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">Order {order.id}</h3>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <Badge variant="outline" className={getStatusColor(order.status)}>
                            {getStatusLabel(order.status)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="shipped" className="space-y-4">
                {orders
                  .filter((o) => o.status === 'in-transit')
                  .map((order) => (
                    <Card key={order.id} className="border-secondary">
                      <CardHeader className="border-b border-secondary">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">Order {order.id}</h3>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <Badge variant="outline" className={getStatusColor(order.status)}>
                            {getStatusLabel(order.status)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="delivered" className="space-y-4">
                {orders
                  .filter((o) => o.status === 'delivered')
                  .map((order) => (
                    <Card key={order.id} className="border-secondary">
                      <CardHeader className="border-b border-secondary">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">Order {order.id}</h3>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <Badge variant="outline" className={getStatusColor(order.status)}>
                            {getStatusLabel(order.status)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          )}
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
