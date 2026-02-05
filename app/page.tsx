import { Search, Leaf, ShoppingCart, Filter, ChevronRight, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getFoodItems, getCategories } from "@/app/actions/food-items"
import HomePage from "@/components/home-page-client"

async function HomePageServer() {
  // Fetch initial data
  const [categoriesData, foodItemsData] = await Promise.all([
    getCategories(),
    getFoodItems({ take: 40 }),
  ])

  return (
    <HomePage
      initialCategories={categoriesData}
      initialItems={foodItemsData.items}
      totalItems={foodItemsData.total}
      hasMore={foodItemsData.hasMore}
    />
  )
}

export default HomePageServer

