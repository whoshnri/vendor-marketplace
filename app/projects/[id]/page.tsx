import { ArrowLeft, Heart, MessageSquare, Share2, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ProjectComments } from "@/components/project-comments"
import { RelatedProjects } from "@/components/related-projects"

export default function ProjectPage({ params }: { params: { id: string } }) {
  // This would normally fetch data based on the ID
  const project = {
    id: params.id,
    title: "Minimalist Brand Identity Design",
    description:
      "A clean and modern brand identity design for a tech startup. The project includes logo design, color palette, typography, and various brand applications.",
    images: [
      "/modern-brand-identity.png",
      "/placeholder.svg?key=30ry5",
      "/placeholder.svg?key=lieet",
      "/placeholder.svg?key=bdm26",
    ],
    creator: {
      name: "Alex Morgan",
      avatar: "/diverse-group.png",
      followers: "12.5k",
    },
    stats: {
      views: "24.3k",
      likes: "1.8k",
      comments: 86,
    },
    tags: ["Branding", "Logo Design", "Identity", "Minimal"],
    createdAt: "May 2, 2024",
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <Button>Upload Work</Button>
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 sm:px-8 md:py-8">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to gallery
              </Link>
            </Button>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={project.creator.avatar || "/placeholder.svg"} alt={project.creator.name} />
                      <AvatarFallback>{project.creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{project.creator.name}</p>
                      <p className="text-xs text-muted-foreground">{project.creator.followers} followers</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>
              </div>
              <div className="space-y-6">
                {project.images.map((image, index) => (
                  <div key={index} className="overflow-hidden rounded-lg">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Project image ${index + 1}`}
                      width={1200}
                      height={600}
                      className="w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-semibold">About this project</h2>
                <p className="mt-2 text-muted-foreground">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <div key={tag} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              <Separator className="my-8" />
              <ProjectComments commentCount={project.stats.comments} />
            </div>
            <div className="space-y-6">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Project Stats</h3>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">Views</span>
                    </div>
                    <p className="font-medium">{project.stats.views}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">Likes</span>
                    </div>
                    <p className="font-medium">{project.stats.likes}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-sm">Comments</span>
                    </div>
                    <p className="font-medium">{project.stats.comments}</p>
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  <Button className="flex-1">
                    <Heart className="mr-2 h-4 w-4" />
                    Like
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Project Information</h3>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Published</span>
                    <span>{project.createdAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tools</span>
                    <span>Figma, Photoshop</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">License</span>
                    <span>All Rights Reserved</span>
                  </div>
                </div>
              </div>
              <RelatedProjects />
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
