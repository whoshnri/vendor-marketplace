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


