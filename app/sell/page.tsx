'use client'

import { ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export default function SellPage() {
  const benefits = [
    { title: 'Reach More Customers', description: 'Access thousands of food lovers looking for fresh, local products' },
    { title: 'Easy Setup', description: 'Get your shop up and running in minutes with our simple vendor tools' },
    { title: 'Fair Pricing', description: 'Competitive commission rates that help you maximize your earnings' },
    { title: 'Secure Payments', description: 'Get paid directly to your bank account every week' },
    { title: 'Marketing Support', description: 'Leverage our community and promotional tools to grow your sales' },
    { title: 'Analytics Dashboard', description: 'Track your sales, inventory, and customer feedback in real-time' },
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
        {/* Hero Section */}
        <section className="border-b border-secondary bg-gradient-to-br from-primary/5 via-accent/5 to-background py-12 md:py-16">
          <div className="container px-4 sm:px-8">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                  Grow Your Food Business
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Turn your passion for food into profit. Join thousands of vendors selling on FreshMarket and reach customers who value quality and local.
                </p>
                <div className="mt-8 flex gap-4">
                  <Button size="lg" className="gap-2">
                    Start Selling <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative h-64 w-full md:h-80">
                  <Image
                    src="/packaging-design-collection.png"
                    alt="Vendor setup"
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 sm:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold">Why Sell on FreshMarket?</h2>
              <p className="mt-4 text-lg text-muted-foreground">Everything you need to succeed as a vendor</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, idx) => (
                <Card key={idx} className="border-secondary">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* Registration Form Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 sm:px-8">
            <div className="mx-auto max-w-md">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold">Ready to Start Selling?</h2>
                <p className="mt-2 text-muted-foreground">Create your vendor account today</p>
              </div>

              <Card className="border-secondary">
                <CardContent className="space-y-4 pt-6">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <Input placeholder="Your name" className="mt-2" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email Address</label>
                    <Input type="email" placeholder="you@example.com" className="mt-2" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Business Name</label>
                    <Input placeholder="Your farm/business name" className="mt-2" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Primary Food Category</label>
                    <select className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground">
                      <option>Select a category</option>
                      <option>Fresh Produce</option>
                      <option>Dairy & Eggs</option>
                      <option>Bakery & Grains</option>
                      <option>Prepared Foods</option>
                      <option>Meat & Seafood</option>
                      <option>Beverages</option>
                    </select>
                  </div>
                  <Button className="w-full" size="lg">
                    Create Vendor Account
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Already have an account? <Link href="/login" className="text-primary hover:underline">Sign in</Link>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-t border-secondary bg-secondary/20 py-12 md:py-16">
          <div className="container px-4 sm:px-8">
            <div className="grid gap-8 text-center md:grid-cols-3">
              <div>
                <div className="text-4xl font-bold text-primary">2,500+</div>
                <p className="mt-2 text-muted-foreground">Active Vendors</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">50K+</div>
                <p className="mt-2 text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">$2.5M+</div>
                <p className="mt-2 text-muted-foreground">Sales Generated</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-secondary bg-secondary/20 py-8">
        <div className="container px-4 text-center text-sm text-muted-foreground sm:px-8">
          <p>© 2024 FreshMarket. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
