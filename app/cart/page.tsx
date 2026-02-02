'use client'

import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'

export default function CartPage() {
  // Mock cart data - would come from context/state in real app
  const cartItems = [
    {
      id: '1',
      name: 'Organic Heirloom Tomatoes',
      vendor: 'Green Valley Farm',
      price: 5.99,
      quantity: 2,
      image: '/diverse-group.png',
      category: 'Produce',
    },
    {
      id: '2',
      name: 'Free-Range Eggs (Dozen)',
      vendor: 'Sunny Side Farm',
      price: 6.49,
      quantity: 1,
      image: '/diverse-person.png',
      category: 'Dairy',
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + tax + shipping

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
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground">Review your items before checkout</p>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-secondary bg-secondary/5 py-12">
              <ShoppingCart className="mb-4 h-12 w-12 text-muted-foreground" />
              <h2 className="text-xl font-semibold">Your cart is empty</h2>
              <p className="mb-6 text-muted-foreground">Start shopping to add items to your cart</p>
              <Link href="/">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="border-secondary">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.vendor}</p>
                          <p className="mt-2 text-base font-semibold text-primary">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <div className="flex items-center gap-2 rounded-md border border-secondary bg-secondary/50">
                            <button className="p-1 hover:bg-secondary">
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                            <button className="p-1 hover:bg-secondary">
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="lg:col-span-1">
                <Card className="border-secondary sticky top-20">
                  <CardHeader className="border-b border-secondary">
                    <h2 className="text-lg font-semibold">Order Summary</h2>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium">
                          {shipping === 0 ? (
                            <span className="text-primary">FREE</span>
                          ) : (
                            `$${shipping.toFixed(2)}`
                          )}
                        </span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3 border-t border-secondary pt-6">
                    <Button className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                    <Link href="/" className="w-full">
                      <Button variant="outline" className="w-full bg-transparent">
                        Continue Shopping
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

                <div className="mt-6 rounded-lg border border-secondary bg-accent/10 p-4">
                  <h3 className="font-semibold text-foreground mb-2">Have a promo code?</h3>
                  <div className="flex gap-2">
                    <Input placeholder="Enter code" className="text-sm" />
                    <Button variant="outline" size="sm">Apply</Button>
                  </div>
                </div>
              </div>
            </div>
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
