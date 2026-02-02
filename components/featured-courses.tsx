import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function FeaturedCourses() {
  return (
    <div className="relative overflow-hidden rounded-xl border bg-gradient-to-b from-background to-muted/30 p-6 md:p-8">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold">Featured Courses</h2>
          <p className="text-muted-foreground">
            Expand your design skills with our curated selection of top-rated courses
          </p>
        </div>
        <Button asChild variant="outline" className="w-full md:w-auto bg-transparent">
          <Link href="#">
            View All Courses
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredCourses.map((course) => (
          <Link key={course.id} href={`/learn/${course.id}`}>
            <Card
              key={course.id}
              className="overflow-hidden border-0 bg-background shadow-sm hover:shadow-md transition-all"
            >
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <Badge variant="default">{course.category}</Badge>
                  <span className="text-sm font-medium">{course.price}</span>
                </div>
                <h3 className="mb-2 line-clamp-2 text-lg font-medium">{course.title}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{course.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-full rounded-full bg-muted">
                      <div className="h-1.5 rounded-full bg-primary" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground">{course.progress}%</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                    Continue
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

const featuredCourses = [
  {
    id: "1",
    title: "Complete UI/UX Design Bootcamp",
    description: "Master the fundamentals of UI/UX design from research to high-fidelity prototypes.",
    image: "/ui-ux-bootcamp-unsplash.jpg",
    category: "UI/UX Design",
    price: "$89.99",
    progress: 65,
  },
  {
    id: "2",
    title: "Motion Design Masterclass",
    description: "Learn to create stunning animations and motion graphics for digital products.",
    image: "/motion-design-unsplash.jpg",
    category: "Motion Design",
    price: "$69.99",
    progress: 32,
  },
  {
    id: "3",
    title: "Design Leadership & Management",
    description: "Develop the skills to lead design teams and manage creative projects effectively.",
    image: "/design-leadership-unsplash.jpg",
    category: "Career",
    price: "$99.99",
    progress: 18,
  },
]

export default FeaturedCourses
