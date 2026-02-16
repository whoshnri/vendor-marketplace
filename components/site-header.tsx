'use client'

import { useState, useEffect } from 'react'
import { Search, ShoppingCart, Star } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'
import { getCurrentUser } from '@/app/actions/auth'
import { FavoritesSheet } from '@/components/favorites-sheet'
import { useFavorites } from '@/lib/favorites-context'
import { Badge } from '@/components/ui/badge'

export function SiteHeader() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
    const [currentUser, setCurrentUser] = useState<any>(null)
    const [isUserLoading, setIsUserLoading] = useState(true)
    const { favoriteCount } = useFavorites()

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getCurrentUser()
            setCurrentUser(user)
            setIsUserLoading(false)
        }
        fetchUser()
    }, [])

    useEffect(() => {
        setSearchQuery(searchParams.get('search') || '')
    }, [searchParams])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchQuery)}`)
        } else {
            router.push('/shop')
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-secondary bg-background">
            <div className="container flex h-16 items-center gap-4 px-4 sm:px-8">
                <MainNav />
                <div className="ml-auto flex items-center gap-2 sm:gap-4 flex-1 justify-end max-w-xl">
                    <form onSubmit={handleSearch} className="relative hidden sm:flex flex-1 max-w-md">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search items or vendors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-8"
                        />
                    </form>
                    {!isUserLoading && currentUser?.role !== 'VENDOR' && (
                        <Link href="/sell" className="hidden xs:block">
                            <Button variant="outline" size="sm">
                                Sell
                            </Button>
                        </Link>
                    )}
                    <FavoritesSheet>
                        <Button size="icon" variant="outline" className="relative">
                            <Star className={`h-4 w-4 ${favoriteCount > 0 ? 'fill-primary text-primary' : ''}`} />
                            {favoriteCount > 0 && (
                                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-[10px]" variant="default">
                                    {favoriteCount}
                                </Badge>
                            )}
                        </Button>
                    </FavoritesSheet>
                    <Link href="/cart">
                        <Button size="icon" variant="outline">
                            <ShoppingCart className="h-4 w-4" />
                        </Button>
                    </Link>
                    <UserNav />
                </div>
            </div>
            {/* Mobile Search Bar */}
            <div className="border-t border-secondary bg-secondary/5 px-4 py-3 sm:hidden">
                <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search farm-fresh food..."
                        className="w-full pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
            </div>
        </header>
    )
}
