import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

import { FavoritesProvider } from "@/lib/favorites-context"
import { CartProvider } from "@/lib/cart-context"

const inter = Inter({ subsets: ["latin"] })

// Update the metadata to reflect the new branding
export const metadata = {
  title: "FreshMarket - Buy & Sell Fresh Food Items",
  description: "A homely food marketplace where buyers and vendors connect. Shop fresh produce, dairy, bakery and more.",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>
            <FavoritesProvider>
              {children}
            </FavoritesProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
