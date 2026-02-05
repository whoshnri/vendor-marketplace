'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'

export default function CheckoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to cart as checkout is now modal-based
    router.push('/cart')
  }, [router])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-secondary bg-background">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
          <MainNav />
          <UserNav />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Redirecting to cart...</p>
        </div>
      </main>
    </div>
  )
}

/*
OLD CHECKOUT PAGE CODE - KEPT FOR REFERENCE
export default function CheckoutPageOld() {
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [orderNumber, setOrderNumber] = useState<string | null>(null)

  const cartItems = [
    {
      id: '1',
      name: 'Organic Heirloom Tomatoes',
      vendor: 'Green Valley Farm',
      price: 5.99,
      quantity: 2,
    },
    {
      id: '2',
      name: 'Free-Range Eggs (Dozen)',
      vendor: 'Sunny Side Farm',
      price: 6.49,
      quantity: 1,
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + tax + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate payment processing
    setTimeout(() => {
      const generated = `FM-${Math.floor(100000 + Math.random() * 900000)}`
      setOrderNumber(generated)
      setIsLoading(false)
      setStep(4)
    }, 2000)
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
          <Link href="/cart" className="mb-6 flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>

          <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Form */}
            <div className="lg:col-span-2">
              {/* Steps Indicator */}
              <div className="mb-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                      step >= 1
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground'
                    }`}
                  >
                    1
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">Shipping</span>
                </div>
                <div className="flex flex-1 items-center gap-2">
                  <div className="flex-1 h-1 bg-secondary" />
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                      step >= 2
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground'
                    }`}
                  >
                    2
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">Payment</span>
                </div>
                <div className="flex flex-1 items-center gap-2">
                  <div className="flex-1 h-1 bg-secondary" />
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                      step >= 3
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground'
                    }`}
                  >
                    3
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">Review</span>
                </div>
                <div className="flex flex-1 items-center gap-2">
                  <div className="flex-1 h-1 bg-secondary" />
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                      step >= 4
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground'
                    }`}
                  >
                    4
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">Done</span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <Card className="border-secondary">
                    <CardHeader>
                      <h2 className="text-xl font-semibold">Shipping Information</h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium">First Name</label>
                          <Input placeholder="John" className="mt-2" required />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Last Name</label>
                          <Input placeholder="Doe" className="mt-2" required />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <Input type="email" placeholder="john@example.com" className="mt-2" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Address</label>
                        <Input placeholder="123 Main St" className="mt-2" required />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium">City</label>
                          <Input placeholder="San Francisco" className="mt-2" required />
                        </div>
                        <div>
                          <label className="text-sm font-medium">State</label>
                          <Input placeholder="CA" className="mt-2" required />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium">ZIP Code</label>
                          <Input placeholder="94102" className="mt-2" required />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Phone</label>
                          <Input type="tel" placeholder="(555) 000-0000" className="mt-2" required />
                        </div>
                      </div>
                      <Button
                        type="button"
                        onClick={() => setStep(2)}
                        className="w-full"
                      >
                        Continue to Payment
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {step === 2 && (
                  <Card className="border-secondary">
                    <CardHeader>
                      <h2 className="text-xl font-semibold">Payment Information</h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Cardholder Name</label>
                        <Input placeholder="John Doe" className="mt-2" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Card Number</label>
                        <Input placeholder="1234 5678 9012 3456" className="mt-2" required />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium">Expiry Date</label>
                          <Input placeholder="MM/YY" className="mt-2" required />
                        </div>
                        <div>
                          <label className="text-sm font-medium">CVV</label>
                          <Input placeholder="123" className="mt-2" type="password" required />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(1)}
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setStep(3)}
                          className="flex-1"
                        >
                          Review Order
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {step === 3 && (
                  <Card className="border-secondary">
                    <CardHeader>
                      <h2 className="text-xl font-semibold">Review Your Order</h2>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="mb-3 font-semibold">Items</h3>
                        <div className="space-y-2 border-b border-secondary pb-4">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span>{item.name} x {item.quantity}</span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 border-b border-secondary pb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tax</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Shipping</span>
                          <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                        </div>
                      </div>

                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">${total.toFixed(2)}</span>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(2)}
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="flex-1 gap-2"
                        >
                          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                          {isLoading ? 'Processing...' : 'Place Order'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {step === 4 && (
                  <Card className="border-secondary">
                    <CardHeader>
                      <h2 className="text-xl font-semibold">Order Confirmed</h2>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                        <p className="text-sm font-semibold text-foreground">Thanks for your order!</p>
                        <p className="text-sm text-muted-foreground">
                          Your order number is{' '}
                          <span className="font-semibold text-foreground">{orderNumber}</span>.
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Estimated delivery: 2-3 business days.
                        </p>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tax</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Shipping</span>
                          <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                        </div>
                      </div>

                      <div className="flex justify-between text-lg font-bold">
                        <span>Total paid</span>
                        <span className="text-primary">${total.toFixed(2)}</span>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Link href="/orders" className="flex-1">
                          <Button className="w-full">View orders</Button>
                        </Link>
                        <Link href="/shop" className="flex-1">
                          <Button variant="outline" className="w-full">
                            Continue shopping
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-secondary sticky top-20">
                <CardHeader className="border-b border-secondary">
                  <h2 className="font-semibold">Order Summary</h2>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{item.name}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
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
