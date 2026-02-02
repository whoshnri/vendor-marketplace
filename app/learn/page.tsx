import { Search, Clock, Star, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { FeaturedCourses } from "@/components/featured-courses"

export default function LearnPage() {
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
                placeholder="Search tutorials, courses..."
                className="w-[200px] pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
            <Button>Create Tutorial</Button>
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 sm:px-8 md:py-8">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Learn Design</h1>
              <p className="text-muted-foreground">Tutorials, courses, and resources to help you grow as a designer</p>
            </div>
            <div className="flex w-full items-center gap-2 md:w-auto">
              <div className="relative md:hidden">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="w-full pl-8" />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <FeaturedCourses />
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
                    Design Tools
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                    Career Advice
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-2 text-lg font-medium">Content Type</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="tutorials" className="mr-2" defaultChecked />
                    <label htmlFor="tutorials" className="text-sm">
                      Tutorials
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="courses" className="mr-2" defaultChecked />
                    <label htmlFor="courses" className="text-sm">
                      Courses
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="articles" className="mr-2" defaultChecked />
                    <label htmlFor="articles" className="text-sm">
                      Articles
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="videos" className="mr-2" defaultChecked />
                    <label htmlFor="videos" className="text-sm">
                      Videos
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="podcasts" className="mr-2" />
                    <label htmlFor="podcasts" className="text-sm">
                      Podcasts
                    </label>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-2 text-lg font-medium">Level</h3>
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

              <Separator />

              <div className="hidden md:block">
                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>

            <div>
              <Tabs defaultValue="popular" className="w-full">
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="trending">Trending</TabsTrigger>
                  </TabsList>
                  <Button variant="outline" size="sm" className="hidden md:flex">
                    <Filter className="mr-2 h-4 w-4" />
                    Sort
                  </Button>
                </div>

                <TabsContent value="popular" className="mt-6">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {tutorials.map((tutorial) => (
                      <Link key={tutorial.id} href={`/learn/${tutorial.id}`}>
                        <Card className="h-full overflow-hidden hover:border-primary/50 hover:shadow-sm">
                          <div className="aspect-video w-full overflow-hidden">
                            <Image
                              src={tutorial.image || "/placeholder.svg"}
                              alt={tutorial.title}
                              width={600}
                              height={400}
                              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                          <CardHeader className="p-4 pb-0">
                            <div className="flex items-center justify-between">
                              <Badge variant={tutorial.type === "Course" ? "default" : "secondary"}>
                                {tutorial.type}
                              </Badge>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                <span>{tutorial.duration}</span>
                              </div>
                            </div>
                            <h3 className="mt-2 line-clamp-2 text-lg font-medium">{tutorial.title}</h3>
                          </CardHeader>
                          <CardContent className="p-4 pt-2">
                            <p className="line-clamp-2 text-sm text-muted-foreground">{tutorial.description}</p>
                          </CardContent>
                          <CardFooter className="flex items-center justify-between p-4 pt-0">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={tutorial.author.avatar || "/placeholder.svg"}
                                  alt={tutorial.author.name}
                                />
                                <AvatarFallback>{tutorial.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">{tutorial.author.name}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-amber-500">
                              <Star className="h-4 w-4 fill-current" />
                              <span>{tutorial.rating}</span>
                            </div>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="recent" className="mt-6">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {tutorials
                      .slice()
                      .reverse()
                      .map((tutorial) => (
                        <Link key={tutorial.id} href={`/learn/${tutorial.id}`}>
                          <Card className="h-full overflow-hidden hover:border-primary/50 hover:shadow-sm">
                            <div className="aspect-video w-full overflow-hidden">
                              <Image
                                src={tutorial.image || "/placeholder.svg"}
                                alt={tutorial.title}
                                width={600}
                                height={400}
                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                              />
                            </div>
                            <CardHeader className="p-4 pb-0">
                              <div className="flex items-center justify-between">
                                <Badge variant={tutorial.type === "Course" ? "default" : "secondary"}>
                                  {tutorial.type}
                                </Badge>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Clock className="mr-1 h-3 w-3" />
                                  <span>{tutorial.duration}</span>
                                </div>
                              </div>
                              <h3 className="mt-2 line-clamp-2 text-lg font-medium">{tutorial.title}</h3>
                            </CardHeader>
                            <CardContent className="p-4 pt-2">
                              <p className="line-clamp-2 text-sm text-muted-foreground">{tutorial.description}</p>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between p-4 pt-0">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage
                                    src={tutorial.author.avatar || "/placeholder.svg"}
                                    alt={tutorial.author.name}
                                  />
                                  <AvatarFallback>{tutorial.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground">{tutorial.author.name}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-amber-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span>{tutorial.rating}</span>
                              </div>
                            </CardFooter>
                          </Card>
                        </Link>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="trending" className="mt-6">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {tutorials
                      .sort((a, b) => b.rating - a.rating)
                      .map((tutorial) => (
                        <Link key={tutorial.id} href={`/learn/${tutorial.id}`}>
                          <Card className="h-full overflow-hidden hover:border-primary/50 hover:shadow-sm">
                            <div className="aspect-video w-full overflow-hidden">
                              <Image
                                src={tutorial.image || "/placeholder.svg"}
                                alt={tutorial.title}
                                width={600}
                                height={400}
                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                              />
                            </div>
                            <CardHeader className="p-4 pb-0">
                              <div className="flex items-center justify-between">
                                <Badge variant={tutorial.type === "Course" ? "default" : "secondary"}>
                                  {tutorial.type}
                                </Badge>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Clock className="mr-1 h-3 w-3" />
                                  <span>{tutorial.duration}</span>
                                </div>
                              </div>
                              <h3 className="mt-2 line-clamp-2 text-lg font-medium">{tutorial.title}</h3>
                            </CardHeader>
                            <CardContent className="p-4 pt-2">
                              <p className="line-clamp-2 text-sm text-muted-foreground">{tutorial.description}</p>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between p-4 pt-0">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage
                                    src={tutorial.author.avatar || "/placeholder.svg"}
                                    alt={tutorial.author.name}
                                  />
                                  <AvatarFallback>{tutorial.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground">{tutorial.author.name}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-amber-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span>{tutorial.rating}</span>
                              </div>
                            </CardFooter>
                          </Card>
                        </Link>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-8 flex justify-center">
                <Button variant="outline">Load More</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left">
          <p className="text-sm text-muted-foreground">© 2024 DesignGallery. All rights reserved.</p>
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

const tutorials = [
  {
    id: "1",
    title: "Mastering Design Systems in Figma",
    description:
      "Learn how to create, maintain, and implement design systems in Figma to improve consistency and efficiency in your design workflow.",
    image: "/design-systems-unsplash.jpg",
    type: "Course",
    duration: "4h 30m",
    level: "Intermediate",
    rating: 4.9,
    author: {
      name: "Alex Morgan",
      avatar: "/diverse-person.png",
    },
    categories: ["UI Design", "Design Tools"],
  },
  {
    id: "2",
    title: "User Research Fundamentals",
    description:
      "Discover essential user research methods and techniques to inform your design decisions and create more user-centered products.",
    image: "/user-research-unsplash.jpg",
    type: "Tutorial",
    duration: "2h 15m",
    level: "Beginner",
    rating: 4.7,
    author: {
      name: "Jamie Chen",
      avatar: "/diverse-group-two.png",
    },
    categories: ["UX Design", "Research"],
  },
  {
    id: "3",
    title: "Advanced Typography for Digital Products",
    description:
      "Elevate your typography skills and learn how to create beautiful, readable, and accessible type systems for websites and apps.",
    image: "/typography-unsplash.jpg",
    type: "Course",
    duration: "3h 45m",
    level: "Advanced",
    rating: 4.8,
    author: {
      name: "Sam Wilson",
      avatar: "/diverse-group-outdoors.png",
    },
    categories: ["Typography", "UI Design"],
  },
  {
    id: "4",
    title: "Introduction to 3D Design with Blender",
    description:
      "Get started with 3D design using Blender. Learn the fundamentals of modeling, texturing, lighting, and rendering.",
    image: "/3d-design-unsplash.jpg",
    type: "Course",
    duration: "6h 20m",
    level: "Beginner",
    rating: 4.6,
    author: {
      name: "Taylor Reed",
      avatar: "/diverse-group-four.png",
    },
    categories: ["3D & Animation", "Design Tools"],
  },
  {
    id: "5",
    title: "Designing for Accessibility",
    description: "Learn how to create inclusive designs that work for everyone, including people with disabilities.",
    image: "/accessibility-unsplash.jpg",
    type: "Tutorial",
    duration: "1h 45m",
    level: "Intermediate",
    rating: 4.9,
    author: {
      name: "Jordan Lee",
      avatar: "/diverse-group-five.png",
    },
    categories: ["UI Design", "UX Design", "Accessibility"],
  },
  {
    id: "6",
    title: "Creating Effective Design Portfolios",
    description:
      "Learn how to showcase your work effectively and create a portfolio that helps you land your dream design job.",
    image: "/portfolio-unsplash.jpg",
    type: "Tutorial",
    duration: "2h 10m",
    level: "All Levels",
    rating: 4.7,
    author: {
      name: "Casey Kim",
      avatar: "/diverse-group-six.png",
    },
    categories: ["Career Advice", "Portfolio"],
  },
]
