'use client'

import { useState } from 'react'
import { Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { completeCheckout } from '@/app/actions/orders'
import { useToast } from '@/hooks/use-toast'
import { formatCurrency } from '@/lib/utils'

interface CheckoutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image: string
    vendor: string
  }>
  totals: {
    subtotal: number
    tax: number
    shipping: number
    total: number
  }
  onSuccess?: (orderNumber: string) => void
}

export function CheckoutModal({ open, onOpenChange, items, totals, onSuccess }: CheckoutModalProps) {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form')
  const [orderNumber, setOrderNumber] = useState<string>('')
  const [email, setEmail] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !cardNumber || !expiry || !cvv) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive'
      })
      return
    }

    setIsProcessing(true)
    setStep('processing')

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Complete checkout and create order
      const result = await completeCheckout(email, cardNumber, expiry, cvv)

      if (!result.ok) {
        toast({
          title: 'Error',
          description: result.error || 'Failed to process payment',
          variant: 'destructive'
        })
        setStep('form')
        setIsProcessing(false)
        return
      }

      setOrderNumber(result.orderId)
      setStep('success')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while processing your order',
        variant: 'destructive'
      })
      setStep('form')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClose = () => {
    if (step !== 'processing') {
      setStep('form')
      setEmail('')
      setCardNumber('')
      setExpiry('')
      setCvv('')
      onOpenChange(false)
    }
  }

  const handleSuccessClose = () => {
    if (orderNumber && onSuccess) {
      onSuccess(orderNumber)
    }
    setStep('form')
    setEmail('')
    setCardNumber('')
    setExpiry('')
    setCvv('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md border-none">
        {step === 'form' && (
          <>
            <DialogHeader>
              <DialogTitle>Complete Your Order</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 px-2 max-h-[60vh] overflow-y-auto" style={{
              scrollbarWidth: "none"
            }}>
              <div className="space-y-2 bg-secondary/50 rounded p-3 text-sm border border-secondary">
                <p className="font-semibold text-foreground mb-3">You're about to purchase:</p>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-secondary/50 pt-2 mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(totals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{formatCurrency(totals.tax)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{totals.shipping === 0 ? 'FREE' : formatCurrency(totals.shipping)}</span>
                  </div>
                  <div className="flex justify-between font-semibold mt-2 text-primary">
                    <span>Total</span>
                    <span>{formatCurrency(totals.total)}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium">Card Number</label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>

                <div className="grid gap-3 grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Expiry</label>
                    <Input
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">CVV</label>
                    <Input
                      placeholder="123"
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isProcessing} className="w-full">
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ${formatCurrency(totals.total)} Now`
                  )}
                </Button>
              </form>
            </div>
          </>
        )}

        {step === 'processing' && (
          <div className="space-y-4 py-6 text-center border-none">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
            <div>
              <p className="font-semibold text-foreground">Processing payment...</p>
              <p className="text-sm text-muted-foreground">Please wait while we process your order.</p>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="space-y-4 py-6 max-h-[90vh] overflow-y-auto px-3" style={{
            scrollbarWidth: "none"
          }}>
            <div className="text-center">
              <CheckCircle className="mx-auto h-10 w-10 text-green-500 mb-3" />
              <p className="text-lg font-semibold text-foreground">Order Confirmed!</p>
              <p className="text-sm text-muted-foreground mt-1">Your order has been placed successfully and saved to your account.</p>
            </div>

            <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-center">
              <p className="text-xs text-muted-foreground">Order Number</p>
              <p className="text-lg font-semibold text-foreground">{orderNumber}</p>
            </div>

            <div className="space-y-2 border-b border-secondary pb-3 text-sm">
              <p className="text-xs font-semibold text-muted-foreground">Items Ordered</p>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-muted-foreground">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="text-sm space-y-1 bg-secondary/50 rounded p-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatCurrency(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-medium">{formatCurrency(totals.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">
                  {totals.shipping === 0 ? (
                    <span className="text-primary">FREE</span>
                  ) : (
                    formatCurrency(totals.shipping)
                  )}
                </span>
              </div>
              <div className="border-t border-secondary/50 pt-2 mt-2 flex justify-between font-semibold">
                <span>Total Paid</span>
                <span className="text-primary">{formatCurrency(totals.total)}</span>
              </div>
            </div>

            <Button onClick={handleSuccessClose} className="w-full">
              Continue to Orders
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
