'use client'

import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'
import { Separator } from '@/components/ui/separator'
import { SiteFooter } from '@/components/site-footer'
import { CheckoutModal } from '@/components/checkout-modal'
import { getCart, removeCartItem, updateCartItem } from '@/app/actions/cart'

export default function CartPage() {
  const [items, setItems] = useState<
    Array<{
      id: string
      name: string
      vendor: string
      price: number
      quantity: number
      image: string
      category: string
      stock: number
    }>
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totals, setTotals] = useState({ subtotal: 0, tax: 0, shipping: 0, total: 0 })
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const router = useRouter()

  const refreshCart = async () => {
    setIsLoading(true)
    const result = await getCart()
    if (!result.ok) {
      setError('Please sign in to view your cart.')
      setItems([])
      setTotals({ subtotal: 0, tax: 0, shipping: 0, total: 0 })
      setIsLoading(false)
      return
    }
    setItems(result.items)
    setTotals({
      subtotal: result.subtotal,
      tax: result.tax,
      shipping: result.shipping,
      total: result.total,
    })
    setError(null)
    setIsLoading(false)
  }

  useEffect(() => {
    refreshCart()
  }, [])

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    setIsUpdating(true)
    await updateCartItem(itemId, quantity)
    await refreshCart()
    setIsUpdating(false)
  }

  const handleRemove = async (itemId: string) => {
    setIsUpdating(true)
    await removeCartItem(itemId)
    await refreshCart()
    setIsUpdating(false)
  }

  const handleCheckoutSuccess = (orderNumber: string) => {
    setCheckoutOpen(false)
    router.push(`/orders?new=${orderNumber}`)
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
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground">Review your items before checkout</p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-secondary bg-secondary/5 py-12">
              <ShoppingCart className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">Loading your cart...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-secondary bg-secondary/5 py-12">
              <ShoppingCart className="mb-4 h-12 w-12 text-muted-foreground" />
              <h2 className="text-xl font-semibold">Cart unavailable</h2>
              <p className="mb-6 text-muted-foreground">{error}</p>
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
            </div>
          ) : items.length === 0 ? (
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
                {items.map((item) => (
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
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => handleRemove(item.id)}
                            disabled={isUpdating}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <div className="flex items-center gap-2 rounded-md border border-secondary bg-secondary/50">
                            <button
                              className="p-1 hover:bg-secondary"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={isUpdating}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                            <button
                              className="p-1 hover:bg-secondary"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              disabled={isUpdating || item.quantity >= item.stock}
                            >
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
                        <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span className="font-medium">${totals.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium">
                          {totals.shipping === 0 ? (
                            <span className="text-primary">FREE</span>
                          ) : (
                            `$${totals.shipping.toFixed(2)}`
                          )}
                        </span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${totals.total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3 border-t border-secondary pt-6">
                    <Button className="w-full" size="lg" onClick={() => setCheckoutOpen(true)} disabled={isUpdating}>
                      Proceed to Checkout
                    </Button>
                    <Link href="/" className="w-full">
                      <Button variant="outline" className="w-full bg-transparent">
                        Continue Shopping
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />

      <CheckoutModal
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        items={items}
        totals={totals}
        onSuccess={handleCheckoutSuccess}
      />
    </div>
  )
}
