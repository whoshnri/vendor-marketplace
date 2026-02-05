'use client'

import React from "react"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Leaf } from 'lucide-react'
import { getCurrentUser, signupAction } from '@/app/actions/auth'

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [userType, setUserType] = useState<'buyer' | 'vendor'>('buyer')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    storeName: '',
  })
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setIsLoading(true)
    setError(null)
    const result = await signupAction({
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: userType === 'vendor' ? 'VENDOR' : 'BUYER',
      storeName: userType === 'vendor' ? formData.storeName : undefined,
    })
    setIsLoading(false)
    if (!result.ok) {
      setError(result.error || 'Signup failed.')
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
        </div>
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
                {/* User Type Selection */}
                <div className="mb-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserType('buyer')}
                    className={`rounded-lg border-2 p-4 text-center font-semibold transition-all ${userType === 'buyer'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-input bg-background text-muted-foreground hover:border-primary/50'
                      }`}
                  >
                    <p className="font-bold">Shop</p>
                    <p className="text-xs font-normal">Buy food</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('vendor')}
                    className={`rounded-lg border-2 p-4 text-center font-semibold transition-all ${userType === 'vendor'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-input bg-background text-muted-foreground hover:border-primary/50'
                      }`}
                  >
                    <p className="font-bold">Sell</p>
                    <p className="text-xs font-normal">Start shop</p>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      <p className="font-medium">{error}</p>
                    </div>
                  )}
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-semibold text-foreground">
                      Full Name
                    </label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-foreground">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-10"
                    />
                  </div>

                  {userType === 'vendor' && (
                    <div className="space-y-2">
                      <label htmlFor="storeName" className="text-sm font-semibold text-foreground">
                        Store Name
                      </label>
                      <Input
                        id="storeName"
                        name="storeName"
                        type="text"
                        placeholder="My Fresh Produce"
                        value={formData.storeName}
                        onChange={handleChange}
                        required
                        className="h-10"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-semibold text-foreground">
                      Password
                    </label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-semibold text-foreground">
                      Confirm Password
                    </label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="h-10"
                    />
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <input type="checkbox" id="terms" className="mt-1 rounded" required />
                    <label htmlFor="terms" className="text-xs text-muted-foreground">
                      I agree to the{' '}
                      <Link href="#" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full h-10 font-semibold text-base">
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>

                <div className="mt-6 space-y-1 text-center text-sm text-muted-foreground">
                  <p>Already have an account?</p>
                  <Link href="/login" className="text-primary font-semibold hover:underline block">
                    Sign in
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
