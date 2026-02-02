import { Heart, MessageSquare, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Sample project data
const projects = [
  {
    id: "1",
    title: "Minimalist Brand Identity Design",
    description:
      "Final project from the Brand Identity Design course. Created a clean, modern identity for a tech startup.",
    image: "/modern-brand-identity.png",
    creator: {
      name: "Alex Morgan",
      avatar: "/diverse-person.png",
    },
    stats: {
      views: "24.3k",
      likes: "1.8k",
      comments: 86,
    },
  },
  {
    id: "2",
    title: "Mobile App UI Design",
    description:
      "Capstone project from the Mobile UI Design course. Designed a fitness tracking app with a focus on user experience.",
    image: "/mobile-app-ui-design.png",
    creator: {
      name: "Jamie Chen",
      avatar: "/diverse-group-two.png",
    },
    stats: {
      views: "18.7k",
      likes: "1.2k",
      comments: 42,
    },
  },
  {
    id: "3",
    title: "E-commerce Website Redesign",
    description: "Course project for the E-commerce UX course. Complete redesign focusing on conversion optimization.",
    image: "/ecommerce-website-design.png",
    creator: {
      name: "Sam Wilson",
      avatar: "/diverse-group-outdoors.png",
    },
    stats: {
      views: "32.1k",
      likes: "2.4k",
      comments: 118,
    },
  },
  {
    id: "4",
    title: "Typography Poster Series",
    description: "Final assignment from the Typography Fundamentals course. Created a series of typographic posters.",
    image: "/placeholder.svg?key=bliz1",
    creator: {
      name: "Taylor Reed",
      avatar: "/diverse-group-four.png",
    },
    stats: {
      views: "15.9k",
      likes: "980",
      comments: 64,
    },
  },
  {
    id: "5",
    title: "3D Product Visualization",
    description:
      "Project from the 3D Modeling course. Created photorealistic product renders for an electronics company.",
    image: "/3d-product-visualization.png",
    creator: {
      name: "Jordan Lee",
      avatar: "/diverse-group-five.png",
    },
    stats: {
      views: "28.5k",
      likes: "2.1k",
      comments: 93,
    },
  },
  {
    id: "6",
    title: "Social Media Campaign",
    description:
      "Group project from the Digital Marketing Design course. Created assets for a multi-platform campaign.",
    image: "/placeholder.svg?key=yaiqf",
    creator: {
      name: "Casey Kim",
      avatar: "/diverse-group-six.png",
    },
    stats: {
      views: "19.2k",
      likes: "1.5k",
      comments: 72,
    },
  },
  {
    id: "7",
    title: "Packaging Design Collection",
    description:
      "Final project from the Packaging Design course. Created a cohesive product line with sustainable materials.",
    image: "/packaging-design-collection.png",
    creator: {
      name: "Riley Johnson",
      avatar: "/diverse-group-seven.png",
    },
    stats: {
      views: "22.8k",
      likes: "1.7k",
      comments: 81,
    },
  },
  {
    id: "8",
    title: "Illustration Series",
    description:
      "Personal project created after completing the Digital Illustration course. A series of character designs.",
    image: "/digital-illustration-series.png",
    creator: {
      name: "Quinn Parker",
      avatar: "/diverse-group-eight.png",
    },
    stats: {
      views: "26.4k",
      likes: "2.2k",
      comments: 104,
    },
  },
]

export function ProjectGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.id}`}
          className="group overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
        >
          <div className="aspect-[4/3] overflow-hidden relative">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={800}
              height={600}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute left-2 top-2">
              <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                Course Project
              </Badge>
            </div>
          </div>
          <div className="p-4">
            <h3 className="line-clamp-1 font-medium">{project.title}</h3>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={project.creator.avatar || "/placeholder.svg"} alt={project.creator.name} />
                  <AvatarFallback>{project.creator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{project.creator.name}</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{project.stats.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  <span>{project.stats.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  <span>{project.stats.comments}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
