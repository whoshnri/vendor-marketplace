'use client'

import { ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'
import { Separator } from '@/components/ui/separator'
import { SiteFooter } from '@/components/site-footer'
import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/app/actions/auth'

export default function SellPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const benefits = [
    { title: 'Reach More Customers', description: 'Access thousands of food lovers looking for fresh, local products' },
    { title: 'Easy Setup', description: 'Get your shop up and running in minutes with our simple vendor tools' },
    { title: 'Fair Pricing', description: 'Competitive commission rates that help you maximize your earnings' },
    { title: 'Secure Payments', description: 'Get paid directly to your bank account every week' },
    { title: 'Marketing Support', description: 'Leverage our community and promotional tools to grow your sales' },
    { title: 'Analytics Dashboard', description: 'Track your sales, inventory, and customer feedback in real-time' },
  ]

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser()
      setCurrentUser(user)
      setIsCheckingAuth(false)
    }
    fetchUser()
  }, [])

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
                <p className="mt-2 text-muted-foreground">Create your vendor account today and start growing your business</p>
              </div>
              <Card className="border border-secondary shadow-sm">
                <CardContent className="space-y-4 pt-6">
                  {isCheckingAuth ? (
                    <div className="space-y-3 text-center">
                      <div className="h-8 w-8 mx-auto rounded-full bg-secondary animate-pulse" />
                      <p className="text-sm text-muted-foreground">Checking your account…</p>
                    </div>
                  ) : currentUser ? (
                    <div className="space-y-4">
                      <div className="space-y-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                        <p className="text-sm font-semibold text-foreground">You’re signed in</p>
                        <p className="text-xs text-muted-foreground">
                          Signed in as {currentUser.name || currentUser.email}
                        </p>
                      </div>
                      <div className="grid gap-3">
                        <Link href="/account" className="block">
                          <Button className="w-full">Go to account</Button>
                        </Link>
                        <Link href="/shop" className="block">
                          <Button variant="outline" className="w-full">
                            Browse the shop
                          </Button>
                        </Link>
                        {currentUser.role === 'VENDOR' && (
                          <>
                            <Link href="/vendor/dashboard" className="block">
                              <Button variant="outline" className="w-full">
                                Vendor dashboard
                              </Button>
                            </Link>
                            <Link href="/vendor/products" className="block">
                              <Button variant="outline" className="w-full">
                                Manage products
                              </Button>
                            </Link>
                            <Link href="/vendor/payouts" className="block">
                              <Button variant="outline" className="w-full">
                                View payouts
                              </Button>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <h3 className="font-semibold text-foreground">What you'll get:</h3>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            Unlimited product listings
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            Sales analytics dashboard
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            Direct customer access
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            Weekly payouts
                          </li>
                        </ul>
                      </div>
                      
                      <Link href="/signup?role=vendor" className="block">
                        <Button className="w-full h-10 font-semibold text-base">
                          Create Vendor Account
                        </Button>
                      </Link>
                      
                      <p className="text-center text-xs text-muted-foreground">
                        Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
                      </p>
                    </>
                  )}
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

      <SiteFooter />
    </div>
  )
}
