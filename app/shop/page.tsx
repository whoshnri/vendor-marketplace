import { getCategories } from '@/app/actions/food-items'
import ShopPageClient from '@/components/shop-page-client'

async function ShopPage() {
  const categories = await getCategories()

  return <ShopPageClient categories={categories} />
}

export default ShopPage
