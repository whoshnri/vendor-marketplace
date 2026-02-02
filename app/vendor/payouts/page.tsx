'use client'

import { DollarSign, Download, TrendingUp, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function VendorPayouts() {
  const payoutStats = [
    {
      label: 'Available Balance',
      value: '$2,456.50',
      icon: DollarSign,
    },
    {
      label: 'Total Earned',
      value: '$12,456.50',
      icon: TrendingUp,
    },
    {
      label: 'Pending Payment',
      value: '$234.67',
      icon: AlertCircle,
    },
  ]

  const payoutHistory = [
    {
      id: 'PAY-001',
      date: 'Dec 15, 2024',
      amount: '$1,250.00',
      status: 'Completed',
      method: 'Bank Transfer',
    },
    {
      id: 'PAY-002',
      date: 'Dec 1, 2024',
      amount: '$2,150.75',
      status: 'Completed',
      method: 'Bank Transfer',
    },
    {
      id: 'PAY-003',
      date: 'Nov 15, 2024',
      amount: '$1,890.50',
      status: 'Completed',
      method: 'Bank Transfer',
    },
    {
      id: 'PAY-004',
      date: 'Nov 1, 2024',
      amount: '$2,340.25',
      status: 'Completed',
      method: 'Bank Transfer',
    },
  ]

  const bankInfo = {
    accountHolder: 'Green Valley Farm',
    bankName: 'First National Bank',
    accountNumber: '****1234',
    routingNumber: '****5678',
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
            <h1 className="text-3xl font-bold">Payouts & Earnings</h1>
            <p className="text-muted-foreground">Manage your payments and view earnings history</p>
          </div>

          {/* Alert */}
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertDescription className="text-primary/90">
              Your next payout will be processed on December 25, 2024
            </AlertDescription>
          </Alert>

          {/* Stats */}
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            {payoutStats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <Card key={idx} className="border-secondary">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="mt-2 text-2xl font-bold text-primary">{stat.value}</p>
                      </div>
                      <Icon className="h-8 w-8 text-primary/30" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Actions */}
          <div className="mb-8 flex gap-4">
            <Button className="gap-2">
              <DollarSign className="h-4 w-4" />
              Request Payout
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Download Statement
            </Button>
          </div>

          <Separator className="my-8" />

          {/* Bank Account */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Bank Account Information</h2>
            <Card className="border-secondary">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Account Holder</p>
                      <p className="mt-1 font-semibold">{bankInfo.accountHolder}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bank Name</p>
                      <p className="mt-1 font-semibold">{bankInfo.bankName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Account Number</p>
                      <p className="mt-1 font-semibold">{bankInfo.accountNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Routing Number</p>
                      <p className="mt-1 font-semibold">{bankInfo.routingNumber}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Update Bank Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment History */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Payment History</h2>
            <Card className="border-secondary">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-secondary">
                        <th className="px-6 py-4 text-left font-semibold text-foreground">Payout ID</th>
                        <th className="px-6 py-4 text-left font-semibold text-foreground">Date</th>
                        <th className="px-6 py-4 text-left font-semibold text-foreground">Amount</th>
                        <th className="px-6 py-4 text-left font-semibold text-foreground">Method</th>
                        <th className="px-6 py-4 text-left font-semibold text-foreground">Status</th>
                        <th className="px-6 py-4 text-left font-semibold text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payoutHistory.map((payout) => (
                        <tr
                          key={payout.id}
                          className="border-b border-secondary hover:bg-secondary/30 transition-colors"
                        >
                          <td className="px-6 py-4 font-semibold text-foreground">{payout.id}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{payout.date}</td>
                          <td className="px-6 py-4 font-bold text-primary">{payout.amount}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{payout.method}</td>
                          <td className="px-6 py-4">
                            <Badge className="bg-green-100 text-green-800" variant="outline">
                              {payout.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                              <Download className="h-3 w-3" />
                              Receipt
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
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
