import { Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Badge } from "@/components/ui/badge"
import { DesignerGrid } from "@/components/designer-grid"

export default function DesignersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <div className="relative hidden md:flex">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search designers..."
                className="w-[200px] pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
            <Button>Upload Work</Button>
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 sm:px-8 md:py-8">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Designers</h1>
              <p className="text-muted-foreground">Discover talented designers from around the world</p>
            </div>
            <div className="flex w-full items-center gap-2 md:w-auto">
              <div className="relative md:hidden">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search designers..." className="w-full pl-8" />
              </div>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-3">
            <Badge variant="outline" className="rounded-full px-4 py-1">
              All
            </Badge>
            <Badge variant="secondary" className="rounded-full px-4 py-1">
              UI/UX
            </Badge>
            <Badge variant="outline" className="rounded-full px-4 py-1">
              Graphic Design
            </Badge>
            <Badge variant="outline" className="rounded-full px-4 py-1">
              Illustration
            </Badge>
            <Badge variant="outline" className="rounded-full px-4 py-1">
              3D
            </Badge>
            <Badge variant="outline" className="rounded-full px-4 py-1">
              Motion
            </Badge>
            <Badge variant="outline" className="rounded-full px-4 py-1">
              Photography
            </Badge>
          </div>

          <Tabs defaultValue="recommended" className="w-full">
            <TabsList className="mb-6 w-full md:w-auto">
              <TabsTrigger value="recommended" className="flex-1 md:flex-none">
                Recommended
              </TabsTrigger>
              <TabsTrigger value="trending" className="flex-1 md:flex-none">
                Trending
              </TabsTrigger>
              <TabsTrigger value="most-followed" className="flex-1 md:flex-none">
                Most Followed
              </TabsTrigger>
              <TabsTrigger value="new" className="flex-1 md:flex-none">
                New
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recommended" className="mt-0">
              <DesignerGrid />
            </TabsContent>
            <TabsContent value="trending" className="mt-0">
              <DesignerGrid />
            </TabsContent>
            <TabsContent value="most-followed" className="mt-0">
              <DesignerGrid />
            </TabsContent>
            <TabsContent value="new" className="mt-0">
              <DesignerGrid />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left">
          <p className="text-sm text-muted-foreground">© 2024 CourseMarketplace. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Link href="#" className="hover:underline">
              Help
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
