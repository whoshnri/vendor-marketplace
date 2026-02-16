'use client'

import { Star, X, ShoppingCart, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { useFavorites } from '@/lib/favorites-context'
import { useCart } from '@/lib/cart-context'
import { formatCurrency } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

export function FavoritesSheet({ children }: { children: React.ReactNode }) {
    const { favorites, removeFavorite, favoriteCount } = useFavorites()
    const { addItem } = useCart()

    const handleAddToCart = (item: any) => {
        addItem({
            id: item.id,
            name: item.name,
            vendor: item.vendor,
            price: item.price,
            image: item.image,
            category: item.category,
            quantity: 1,
        })
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md border-l-secondary flex flex-col p-0">
                <SheetHeader className="p-6 border-b border-secondary">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="flex items-center gap-2">
                            <Star className="h-5 w-5 fill-primary text-primary" />
                            My Favorites
                            {favoriteCount > 0 && (
                                <Badge variant="secondary" className="ml-2">
                                    {favoriteCount}
                                </Badge>
                            )}
                        </SheetTitle>
                    </div>
                </SheetHeader>

                <ScrollArea className="flex-1">
                    {favorites.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[50vh] p-8 text-center">
                            <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mb-4">
                                <Star className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">No favorites yet</h3>
                            <p className="text-sm text-muted-foreground max-w-[250px]">
                                Start starring items you love to find them easily later.
                            </p>
                            <Button variant="outline" className="mt-6" asChild>
                                <Link href="/shop">Browse Shop</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="divide-y divide-secondary">
                            {favorites.map((item) => (
                                <div key={item.id} className="p-6">
                                    <div className="flex gap-4">
                                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-secondary bg-secondary/20">
                                            <Image
                                                src={item.image || '/placeholder.svg'}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col truncate">
                                            <div className="flex items-start justify-between gap-2">
                                                <Link
                                                    href={`/shop/${item.id}`}
                                                    className="font-medium text-foreground hover:text-primary transition-colors truncate"
                                                >
                                                    {item.name}
                                                </Link>
                                                <button
                                                    onClick={() => removeFavorite(item.id)}
                                                    className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <p className="text-xs text-muted-foreground mb-2">{item.vendor} • {item.category}</p>
                                            <div className="mt-auto flex items-center justify-between">
                                                <span className="font-bold text-primary">
                                                    {formatCurrency(item.price)}
                                                </span>
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="secondary"
                                                        className="h-8 px-2"
                                                        onClick={() => handleAddToCart(item)}
                                                    >
                                                        <ShoppingCart className="h-3 w-3 mr-1" />
                                                        Add
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>

                {favorites.length > 0 && (
                    <div className="p-6 border-t border-secondary bg-secondary/5">
                        <Button className="w-full" variant="outline" asChild>
                            <Link href="/shop">Find More Items</Link>
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
