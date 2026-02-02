import { ArrowLeft, Clock, Star, BookOpen, Play, CheckCircle, Share2, BookmarkPlus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Card, CardContent } from "@/components/ui/card"

// Sample tutorial data - in a real app, this would come from an API or database
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
    reviews: 128,
    students: 2547,
    progress: 65,
    author: {
      name: "Alex Morgan",
      avatar: "/diverse-person.png",
      bio: "Senior UI/UX Designer with 8+ years of experience. Specializes in design systems and product design.",
    },
    overview:
      "Design systems are essential for creating consistent, scalable, and efficient product designs. This comprehensive course will teach you how to create, maintain, and implement design systems in Figma. You'll learn best practices for component creation, documentation, and team collaboration.",
    whatYouWillLearn: [
      "Understand the fundamentals of design systems and their importance",
      "Create a component library with variants and properties in Figma",
      "Establish design tokens for colors, typography, spacing, and more",
      "Document your design system effectively",
      "Implement version control and updates for your design system",
      "Collaborate with team members using your design system",
    ],
    requirements: [
      "Basic knowledge of Figma",
      "Understanding of UI design principles",
      "A Figma account (free or paid)",
    ],
    modules: [
      {
        title: "Introduction to Design Systems",
        lessons: [
          { title: "What is a Design System?", duration: "10:25", completed: true },
          { title: "Benefits of Using Design Systems", duration: "12:40", completed: true },
          { title: "Famous Design Systems Examples", duration: "15:30", completed: true },
          { title: "Setting Up Your Figma Workspace", duration: "08:15", completed: false },
        ],
      },
      {
        title: "Creating Design Tokens",
        lessons: [
          { title: "Color Tokens and Palettes", duration: "14:20", completed: false },
          { title: "Typography System", duration: "16:45", completed: false },
          { title: "Spacing and Layout Tokens", duration: "12:10", completed: false },
          { title: "Effects and Elevation", duration: "09:35", completed: false },
        ],
      },
      {
        title: "Building Component Library",
        lessons: [
          { title: "Atomic Design Methodology", duration: "18:30", completed: false },
          { title: "Creating Base Components", duration: "22:15", completed: false },
          { title: "Component Variants and Properties", duration: "25:40", completed: false },
          { title: "Auto Layout Best Practices", duration: "20:05", completed: false },
        ],
      },
      {
        title: "Documentation and Implementation",
        lessons: [
          { title: "Documenting Components", duration: "15:50", completed: false },
          { title: "Creating Style Guides", duration: "18:20", completed: false },
          { title: "Version Control for Design Systems", duration: "14:30", completed: false },
          { title: "Team Collaboration Workflows", duration: "16:15", completed: false },
        ],
      },
    ],
    relatedCourses: [
      {
        id: "2",
        title: "Advanced Figma Prototyping",
        image: "/figma-prototyping-unsplash.jpg",
        duration: "3h 15m",
        level: "Advanced",
      },
      {
        id: "3",
        title: "UI Animation Fundamentals",
        image: "/ui-animation-unsplash.jpg",
        duration: "2h 45m",
        level: "Intermediate",
      },
      {
        id: "4",
        title: "Responsive Web Design Principles",
        image: "/responsive-web-unsplash.jpg",
        duration: "3h 30m",
        level: "Beginner",
      },
    ],
  },
]

export default function TutorialDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the tutorial data based on the ID
  const tutorial = tutorials.find((t) => t.id === params.id) || tutorials[0]

  // Calculate completed lessons
  const totalLessons = tutorial.modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const completedLessons = tutorial.modules.reduce(
    (acc, module) => acc + module.lessons.filter((lesson) => lesson.completed).length,
    0,
  )

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <Button>Create Tutorial</Button>
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="relative bg-muted">
          <div className="container px-4 py-8 sm:px-8 md:py-12">
            <Button variant="ghost" size="sm" className="mb-4" asChild>
              <Link href="/learn">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Learn
              </Link>
            </Button>
            <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
              <div>
                <Badge variant={tutorial.type === "Course" ? "default" : "secondary"}>{tutorial.type}</Badge>
                <h1 className="mt-2 text-2xl font-bold md:text-3xl">{tutorial.title}</h1>
                <p className="mt-2 text-muted-foreground">{tutorial.description}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{tutorial.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{tutorial.level}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span>
                      {tutorial.rating} ({tutorial.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <span>{tutorial.students} students</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={tutorial.author.avatar || "/placeholder.svg"} alt={tutorial.author.name} />
                    <AvatarFallback>{tutorial.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{tutorial.author.name}</p>
                    <p className="text-xs text-muted-foreground">Instructor</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="aspect-video w-full overflow-hidden rounded-md bg-muted">
                  <Image
                    src={tutorial.image || "/placeholder.svg"}
                    alt={tutorial.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="icon" className="h-12 w-12 rounded-full">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {completedLessons}/{totalLessons} lessons completed
                    </span>
                    <span className="text-sm font-medium">{tutorial.progress}%</span>
                  </div>
                  <Progress value={tutorial.progress} className="mt-2" />
                </div>
                <div className="mt-4 space-y-3">
                  <Button className="w-full">Continue Learning</Button>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <BookmarkPlus className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container px-4 py-8 sm:px-8">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="content">Course Content</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="mt-6">
              <div className="space-y-4">
                {tutorial.modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="rounded-lg border">
                    <div className="flex items-center justify-between bg-muted p-4">
                      <h3 className="font-medium">
                        Module {moduleIndex + 1}: {module.title}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {module.lessons.filter((lesson) => lesson.completed).length}/{module.lessons.length} lessons
                      </span>
                    </div>
                    <div className="divide-y">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lessonIndex}
                          className={`flex items-center justify-between p-4 ${lesson.completed ? "bg-muted/50" : ""}`}
                        >
                          <div className="flex items-center gap-3">
                            {lesson.completed ? (
                              <CheckCircle className="h-5 w-5 text-primary" />
                            ) : (
                              <Play className="h-5 w-5 text-muted-foreground" />
                            )}
                            <span className={lesson.completed ? "text-muted-foreground" : ""}>
                              {moduleIndex + 1}.{lessonIndex + 1} {lesson.title}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="overview" className="mt-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold">About This Course</h2>
                <p className="mt-2 text-muted-foreground">{tutorial.overview}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">What You'll Learn</h2>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                  {tutorial.whatYouWillLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="mt-1 h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Requirements</h2>
                <ul className="mt-2 space-y-2 pl-6">
                  {tutorial.requirements.map((item, index) => (
                    <li key={index} className="list-disc text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="instructor" className="mt-6">
              <div className="flex flex-col items-center gap-4 rounded-lg border p-6 text-center sm:flex-row sm:text-left">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={tutorial.author.avatar || "/placeholder.svg"} alt={tutorial.author.name} />
                  <AvatarFallback>{tutorial.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{tutorial.author.name}</h2>
                  <p className="mt-1 text-muted-foreground">{tutorial.author.bio}</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      More Courses
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="rounded-lg border p-6">
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                  <div className="text-center">
                    <div className="text-5xl font-bold">{tutorial.rating}</div>
                    <div className="mt-2 flex items-center justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(tutorial.rating) ? "fill-amber-500 text-amber-500" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{tutorial.reviews} reviews</div>
                  </div>
                  <Separator orientation="vertical" className="hidden h-24 sm:block" />
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <div className="w-10 text-sm">{rating} stars</div>
                        <div className="flex-1">
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-amber-500"
                              style={{
                                width: `${
                                  rating === 5
                                    ? "70"
                                    : rating === 4
                                      ? "20"
                                      : rating === 3
                                        ? "7%"
                                        : rating === 2
                                          ? "2%"
                                          : "1%"
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-10 text-right text-sm text-muted-foreground">
                          {rating === 5
                            ? "70%"
                            : rating === 4
                              ? "20%"
                              : rating === 3
                                ? "7%"
                                : rating === 2
                                  ? "2%"
                                  : "1%"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator className="my-6" />
                <div className="space-y-4">
                  <h3 className="font-medium">Student Reviews</h3>
                  <div className="space-y-6">
                    {/* Sample reviews would go here */}
                    <div className="rounded-lg bg-muted/50 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Jane Doe</p>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < 5 ? "fill-amber-500 text-amber-500" : "text-muted-foreground"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">2 weeks ago</span>
                      </div>
                      <p className="mt-2 text-sm">
                        This course was exactly what I needed to level up my design system skills. The instructor
                        explains complex concepts in a clear and concise way. Highly recommended!
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>MS</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Mike Smith</p>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < 4 ? "fill-amber-500 text-amber-500" : "text-muted-foreground"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">1 month ago</span>
                      </div>
                      <p className="mt-2 text-sm">
                        Great content and well-structured lessons. I would have liked more practical exercises, but
                        overall it's a solid course for anyone looking to improve their Figma skills.
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Load More Reviews
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12">
            <h2 className="text-xl font-semibold">Related Courses</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {tutorial.relatedCourses.map((course) => (
                <Link key={course.id} href={`/learn/${course.id}`}>
                  <Card className="h-full overflow-hidden hover:border-primary/50 hover:shadow-sm">
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        width={400}
                        height={225}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="line-clamp-2 font-medium">{course.title}</h3>
                      <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
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
