'use client'

import React from "react"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Leaf } from 'lucide-react'
import { getCurrentUser, loginAction } from '@/app/actions/auth'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser()
      setCurrentUser(user)
      setIsCheckingAuth(false)
    }
    fetchUser()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    const result = await loginAction({ email, password })
    setIsLoading(false)
    if (!result.ok) {
      setError(result.error || 'Login failed.')
      return
    }
    router.push('/')
    router.refresh()
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/5 px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Logo and Welcome */}
        <div className="mb-12 text-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-6">
            <Leaf className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold text-primary">FreshMarket</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your account to continue shopping
          </p>
        </div>

        {/* Login Card */}
        <Card className="border border-secondary shadow-sm">
          <CardContent className="pt-6">
            {isCheckingAuth ? (
              <div className="space-y-3 text-center">
                <div className="h-8 w-8 mx-auto rounded-full bg-secondary animate-pulse" />
                <p className="text-sm text-muted-foreground">Checking your account…</p>
              </div>
            ) : currentUser ? (
              <div className="space-y-5">
                <div className="space-y-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                  <p className="text-sm font-semibold text-foreground">You’re already signed in</p>
                  <p className="text-xs text-muted-foreground">
                    Signed in as {currentUser.name || currentUser.email}
                  </p>
                </div>
                <div className="grid gap-3">
                  <Link href="/" className="block">
                    <Button className="w-full">Go to homepage</Button>
                  </Link>
                  <Link href="/shop" className="block">
                    <Button variant="outline" className="w-full">
                      Browse the shop
                    </Button>
                  </Link>
                  <Link href="/account" className="block">
                    <Button variant="outline" className="w-full">
                      View account
                    </Button>
                  </Link>
                  {currentUser.role === 'VENDOR' && (
                    <Link href="/vendor/dashboard" className="block">
                      <Button variant="outline" className="w-full">
                        Vendor dashboard
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      <p className="font-medium">{error}</p>
                    </div>
                  )}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-foreground">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-semibold text-foreground">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-10"
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-muted-foreground">Remember me</span>
                    </label>
                    <Link href="#" className="text-primary font-medium hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full h-10 font-semibold text-base">
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>

                <div className="mt-6 space-y-1 text-center text-sm text-muted-foreground">
                  <p>Don't have an account?</p>
                  <Link href="/signup" className="text-primary font-semibold hover:underline block">
                    Create an account
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>
            By signing in, you agree to our{' '}
            <Link href="#" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
