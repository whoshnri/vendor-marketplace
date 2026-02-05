'use client'

import Link from 'next/link'
import { Leaf, Instagram, Twitter, Facebook, Youtube, Mail } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function SiteFooter() {
  return (
    <footer className="border-t border-secondary bg-gradient-to-b from-background via-secondary/10 to-secondary/30">
      <div className="container px-4 py-12 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-primary">FreshMarket</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Fresh, local, and handcrafted food delivered from trusted vendors. Discover seasonal favorites,
              artisan makers, and community-powered shopping.
            </p>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Link href="/" className="hover:text-primary" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="/" className="hover:text-primary" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="/" className="hover:text-primary" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="/" className="hover:text-primary" aria-label="Youtube">
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-3 text-sm">
              <p className="text-base font-semibold text-foreground">Explore</p>
              <Link href="/shop" className="block text-muted-foreground hover:text-primary">
                Shop marketplace
              </Link>
              <Link href="/vendors" className="block text-muted-foreground hover:text-primary">
                Local vendors
              </Link>
              <Link href="/sell" className="block text-muted-foreground hover:text-primary">
                Become a vendor
              </Link>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-base font-semibold text-foreground">Support</p>
              <Link href="/account" className="block text-muted-foreground hover:text-primary">
                Account
              </Link>
              <Link href="/orders" className="block text-muted-foreground hover:text-primary">
                Orders & tracking
              </Link>
              <Link href="/cart" className="block text-muted-foreground hover:text-primary">
                Cart
              </Link>
              <Link href="/login" className="block text-muted-foreground hover:text-primary">
                Sign in
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-base font-semibold text-foreground">Get fresh updates</p>
              <p className="text-sm text-muted-foreground">
                Join the FreshMarket list for new drops, vendor spotlights, and seasonal picks.
              </p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row">
              <div className="relative w-full">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-10 pl-9"
                />
              </div>
              <Button type="submit" className="h-10 sm:w-auto">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to our updates and privacy policy.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-secondary pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 FreshMarket. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/" className="hover:text-primary">
              Terms
            </Link>
            <Link href="/" className="hover:text-primary">
              Privacy
            </Link>
            <Link href="/" className="hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
