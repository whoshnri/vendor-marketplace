'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
    Star,
    ShoppingCart,
    ArrowLeft,
    Plus,
    Minus,
    Store,
    ShieldCheck,
    Clock,
    ChevronRight,
    MessageSquare
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { useToast } from '@/hooks/use-toast'
import { addToCart } from '@/app/actions/cart'

interface ProductDetailClientProps {
    product: any
    relatedProducts: any[]
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
    const [quantity, setQuantity] = useState(1)
    const [isAdding, setIsAdding] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const handleAddToCart = async () => {
        setIsAdding(true)
        try {
            const result = await addToCart(product.id, quantity)
            if (result.ok) {
                toast({
                    title: 'Added to cart',
                    description: `${quantity} x ${product.name} added to your cart.`,
                })
            } else {
                router.push('/login')
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to add item to cart.',
                variant: 'destructive',
            })
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />

            <main className="flex-1">
                <div className="container px-4 py-8 sm:px-8">
                    {/* Breadcrumbs */}
                    <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/shop" className="hover:text-primary">Shop</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-foreground font-medium truncate">{product.name}</span>
                    </nav>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="relative aspect-square overflow-hidden rounded-2xl border border-secondary bg-secondary/20 shadow-sm">
                                <Image
                                    src={product.image || '/placeholder.svg'}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-500 hover:scale-105"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col">
                            <div className="mb-6 space-y-4">
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                                        {product.category}
                                    </Badge>
                                    {product.stock > 0 ? (
                                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                            In Stock
                                        </Badge>
                                    ) : (
                                        <Badge variant="destructive">Out of Stock</Badge>
                                    )}
                                </div>

                                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                                    {product.name}
                                </h1>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                                        <span className="text-lg font-bold">{product.rating.toFixed(1)}</span>
                                        <span className="text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
                                    </div>
                                    <Separator orientation="vertical" className="h-4" />
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span>Usually ships in 1-2 days</span>
                                    </div>
                                </div>

                                <div className="text-3xl font-bold text-primary">
                                    ${product.price.toFixed(2)}
                                </div>

                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            <Separator className="my-6" />

                            {/* Purchase Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center rounded-lg border border-secondary p-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-10 w-10 text-muted-foreground"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            disabled={quantity <= 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-10 w-10 text-muted-foreground"
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            disabled={quantity >= product.stock}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {product.stock} items left
                                    </div>
                                </div>

                                <div className="flex gap-3 sm:flex-row">
                                    <Button
                                        size="lg"
                                        className="flex-1 h-14 text-lg font-bold shadow-lg shadow-primary/20"
                                        onClick={handleAddToCart}
                                        disabled={isAdding || product.stock <= 0}
                                    >
                                        {isAdding ? 'Adding to Cart...' : 'Add to Cart'}
                                        <ShoppingCart className="ml-2 h-5 w-5" />
                                    </Button>
                                    <Button variant="outline" size="lg" className="h-14 px-8">
                                        <Star className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>

                            <Separator className="my-8" />

                            {/* Vendor Card */}
                            <Card className="border-secondary bg-gradient-to-br from-secondary/10 to-transparent">
                                <CardContent className="p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-14 w-14 overflow-hidden rounded-full border border-secondary bg-background p-1 shadow-sm">
                                                {product.vendorImage ? (
                                                    <Image
                                                        src={product.vendorImage}
                                                        alt={product.vendor}
                                                        width={56}
                                                        height={56}
                                                        className="h-full w-full rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                                                        {product.vendor[0]}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1 font-bold text-foreground">
                                                    {product.vendor}
                                                    {product.vendorProfile?.isVerified && (
                                                        <ShieldCheck className="h-4 w-4 text-green-500 fill-green-50" />
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                                        {product.vendorProfile?.rating.toFixed(1)}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{product.vendorProfile?.totalSales} sales</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Link href={`/vendors/${product.vendorId}`}>
                                            <Button variant="outline" size="sm" className="gap-2 w-full">
                                                <Store className="h-4 w-4" />
                                                Visit Store
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <Separator className="my-16" />

                    {/* Reviews Section */}
                    <section className="mb-20">
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-foreground">Customer Reviews</h2>
                                <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i <= Math.round(product.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-secondary'}`}
                                            />
                                        ))}
                                    </div>
                                    <span>Based on {product.reviews.length} reviews</span>
                                </div>
                            </div>

                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {product.reviews.length > 0 ? (
                                product.reviews.map((review: any) => (
                                    <Card key={review.id} className="border-secondary hover:border-primary/20 transition-colors">
                                        <CardContent className="p-6">
                                            <div className="mb-4 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 overflow-hidden rounded-full bg-secondary">
                                                        {review.user.image ? (
                                                            <Image
                                                                src={review.user.image}
                                                                alt={review.user.name}
                                                                width={40}
                                                                height={40}
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center font-bold text-muted-foreground">
                                                                {review.user.name[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-foreground">{review.user.name}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {new Date(review.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map((i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-3 w-3 ${i <= review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-secondary'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed italic">
                                                "{review.comment}"
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <div className="col-span-2 py-12 text-center text-muted-foreground flex flex-col items-center gap-3 bg-secondary/10 rounded-xl border border-dashed border-secondary">
                                    <MessageSquare className="h-8 w-8 opacity-20" />
                                    <p>No reviews yet for this product.</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <section className="mb-12">
                            <h2 className="mb-8 text-2xl font-bold text-foreground">More from {product.category}</h2>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {relatedProducts.map((item) => (
                                    <Link key={item.id} href={`/shop/${item.id}`}>
                                        <Card className="h-full overflow-hidden border-secondary transition-all hover:border-primary hover:shadow-md">
                                            <div className="aspect-square w-full overflow-hidden bg-secondary relative">
                                                <Image
                                                    src={item.image || '/placeholder.svg'}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover transition-transform duration-300 hover:scale-105"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="line-clamp-1 font-semibold text-foreground text-sm">{item.name}</h3>
                                                <p className="text-xs text-muted-foreground mb-2">{item.vendor}</p>
                                                <div className="flex items-center justify-between mt-auto pt-2 border-t border-secondary">
                                                    <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                                        <span className="text-xs font-semibold">{item.rating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>

            <SiteFooter />
        </div>
    )
}
