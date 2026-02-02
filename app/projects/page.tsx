import { Search, Grid, LayoutGrid } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Badge } from "@/components/ui/badge"
import { ProjectGrid } from "@/components/project-grid"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProjectsPage() {
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
                placeholder="Search projects..."
                className="w-[200px] pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
            <Button>Share Your Work</Button>
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 sm:px-8 md:py-8">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Student Projects</h1>
              <p className="text-muted-foreground">Explore projects created by students and instructors</p>
            </div>
            <div className="flex w-full items-center gap-2 md:w-auto">
              <div className="relative md:hidden">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search projects..." className="w-full pl-8" />
              </div>
            </div>
          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-[240px_1fr]">
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-medium">Categories</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    All Categories
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                    UI Design
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                    UX Design
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                    Graphic Design
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                    3D & Animation
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                    Branding
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                    Web Design
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium">Course Related</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="all-projects" className="mr-2" defaultChecked />
                    <label htmlFor="all-projects" className="text-sm">
                      All Projects
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="course-projects" className="mr-2" />
                    <label htmlFor="course-projects" className="text-sm">
                      Course Projects
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="capstone-projects" className="mr-2" />
                    <label htmlFor="capstone-projects" className="text-sm">
                      Capstone Projects
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="personal-projects" className="mr-2" />
                    <label htmlFor="personal-projects" className="text-sm">
                      Personal Projects
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium">Skill Level</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="beginner" className="mr-2" />
                    <label htmlFor="beginner" className="text-sm">
                      Beginner
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="intermediate" className="mr-2" />
                    <label htmlFor="intermediate" className="text-sm">
                      Intermediate
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="advanced" className="mr-2" />
                    <label htmlFor="advanced" className="text-sm">
                      Advanced
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium">Tools Used</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="figma" className="mr-2" />
                    <label htmlFor="figma" className="text-sm">
                      Figma
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="photoshop" className="mr-2" />
                    <label htmlFor="photoshop" className="text-sm">
                      Photoshop
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="illustrator" className="mr-2" />
                    <label htmlFor="illustrator" className="text-sm">
                      Illustrator
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="sketch" className="mr-2" />
                    <label htmlFor="sketch" className="text-sm">
                      Sketch
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="blender" className="mr-2" />
                    <label htmlFor="blender" className="text-sm">
                      Blender
                    </label>
                  </div>
                </div>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </div>

            <div>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="rounded-full px-4 py-1">
                    All
                  </Badge>
                  <Badge variant="secondary" className="rounded-full px-4 py-1">
                    Featured
                  </Badge>
                  <Badge variant="outline" className="rounded-full px-4 py-1">
                    Recent
                  </Badge>
                  <Badge variant="outline" className="rounded-full px-4 py-1">
                    Popular
                  </Badge>
                  <Badge variant="outline" className="rounded-full px-4 py-1">
                    Following
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="trending">Trending</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center rounded-md border p-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 bg-muted">
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="hidden">
                  <TabsTrigger value="all">All Projects</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <ProjectGrid />
                </TabsContent>
              </Tabs>

              <div className="mt-8 flex justify-center">
                <Button variant="outline">Load More Projects</Button>
              </div>
            </div>
          </div>
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
