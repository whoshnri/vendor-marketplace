import Link from "next/link"
import { Leaf } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/" className="flex items-center gap-2">
        <Leaf className="h-6 w-6 text-primary" />
        <span className="hidden font-bold text-lg text-primary sm:inline-block">FreshMarket</span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
          Shop
        </Link>
        <Link
          href="/sell"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Sell
        </Link>
        <Link href="/orders" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          Orders
        </Link>
        <Link
          href="/vendors"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Vendors
        </Link>
      </nav>
    </div>
  )
}
