import { getFoodItemById, getFoodItems } from '@/app/actions/food-items'
import { notFound } from 'next/navigation'
import ProductDetailClient from '@/components/product-detail-client'

interface ProductPageProps {
    params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const resolvedParams = await params
    const { id } = resolvedParams

    const product = await getFoodItemById(id)

    if (!product) {
        notFound()
    }

    // Fetch related products (same category)
    const relatedResult = await getFoodItems({
        categoryId: product.categoryId,
        take: 4,
    })

    // Filter out the current product from related items
    const relatedProducts = relatedResult.items.filter((item) => item.id !== product.id)

    return (
        <ProductDetailClient
            product={product}
            relatedProducts={relatedProducts}
        />
    )
}
