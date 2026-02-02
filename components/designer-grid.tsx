import Image from "next/image"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample designers data
const designers = [
  {
    id: "1",
    name: "Alex Morgan",
    avatar: "/diverse-person.png",
    location: "San Francisco, CA",
    specialty: "UI/UX Designer",
    followers: "24.3k",
    projects: 48,
    bio: "Creating intuitive digital experiences with a focus on accessibility and user-centered design.",
    featured: ["/modern-brand-identity.png", "/mobile-app-ui-design.png", "/ecommerce-website-design.png"],
    skills: ["UI Design", "UX Research", "Design Systems", "Prototyping"],
  },
  {
    id: "2",
    name: "Jamie Chen",
    avatar: "/diverse-group-two.png",
    location: "Toronto, Canada",
    specialty: "Product Designer",
    followers: "18.7k",
    projects: 36,
    bio: "Product designer with 8+ years of experience creating digital products that solve real problems.",
    featured: ["/mobile-app-ui-design.png", "/ecommerce-website-design.png", "/3d-product-visualization.png"],
    skills: ["Product Design", "UI/UX", "Design Strategy", "User Testing"],
  },
  {
    id: "3",
    name: "Sam Wilson",
    avatar: "/diverse-group-outdoors.png",
    location: "London, UK",
    specialty: "Graphic Designer",
    followers: "32.1k",
    projects: 64,
    bio: "Passionate about creating bold, memorable brand identities and print designs with a modern twist.",
    featured: ["/ecommerce-website-design.png", "/3d-product-visualization.png", "/modern-brand-identity.png"],
    skills: ["Branding", "Typography", "Print Design", "Illustration"],
  },
  {
    id: "4",
    name: "Taylor Reed",
    avatar: "/diverse-group-four.png",
    location: "Berlin, Germany",
    specialty: "Motion Designer",
    followers: "15.9k",
    projects: 29,
    bio: "Motion designer specializing in 3D animation and interactive experiences for brands and agencies.",
    featured: ["/3d-product-visualization.png", "/modern-brand-identity.png", "/mobile-app-ui-design.png"],
    skills: ["Motion Graphics", "3D Animation", "After Effects", "Cinema 4D"],
  },
  {
    id: "5",
    name: "Jordan Lee",
    avatar: "/diverse-group-five.png",
    location: "Seoul, South Korea",
    specialty: "Illustrator",
    followers: "28.5k",
    projects: 52,
    bio: "Digital illustrator creating colorful, character-driven artwork for editorial and advertising clients.",
    featured: ["/placeholder.svg?key=ce224", "/placeholder.svg?key=gtnmg", "/placeholder.svg?key=08mvh"],
    skills: ["Digital Illustration", "Character Design", "Editorial", "Concept Art"],
  },
  {
    id: "6",
    name: "Casey Kim",
    avatar: "/diverse-group-six.png",
    location: "Melbourne, Australia",
    specialty: "Brand Designer",
    followers: "19.2k",
    projects: 41,
    bio: "Brand designer helping startups and small businesses create authentic and memorable brand identities.",
    featured: ["/brand-identity-concept.png", "/brand-identity-concept-2.png", "/placeholder.svg?key=fpaq9"],
    skills: ["Brand Strategy", "Logo Design", "Brand Guidelines", "Packaging"],
  },
  {
    id: "7",
    name: "Riley Johnson",
    avatar: "/diverse-group-seven.png",
    location: "Stockholm, Sweden",
    specialty: "UX Researcher",
    followers: "12.8k",
    projects: 23,
    bio: "UX researcher with a background in psychology, helping teams create more human-centered products.",
    featured: ["/placeholder.svg?key=csz6e", "/placeholder.svg?key=m86ke", "/placeholder.svg?key=3q0tc"],
    skills: ["User Research", "Usability Testing", "Data Analysis", "Workshop Facilitation"],
  },
  {
    id: "8",
    name: "Quinn Parker",
    avatar: "/diverse-group-eight.png",
    location: "New York, USA",
    specialty: "3D Artist",
    followers: "26.4k",
    projects: 37,
    bio: "3D artist creating immersive digital experiences and product visualizations for global brands.",
    featured: ["/3d-product-visualization.png", "/placeholder.svg?key=te1lj", "/placeholder.svg?key=w3xu6"],
    skills: ["3D Modeling", "Texturing", "Lighting", "Rendering"],
  },
]

export function DesignerGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {designers.map((designer) => (
        <Link key={designer.id} href={`/designers/${designer.id}`}>
          <Card className="overflow-hidden hover:border-primary/50 hover:shadow-sm transition-all">
            <CardContent className="p-0">
              <div className="grid grid-cols-3 gap-1 p-1">
                {designer.featured.map((image, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-md">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${designer.name}'s work ${index + 1}`}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={designer.avatar || "/placeholder.svg"} alt={designer.name} />
                      <AvatarFallback>{designer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{designer.name}</h3>
                      <p className="text-xs text-muted-foreground">{designer.specialty}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{designer.bio}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {designer.skills.slice(0, 2).map((skill) => (
                    <Badge key={skill} variant="secondary" className="font-normal">
                      {skill}
                    </Badge>
                  ))}
                  {designer.skills.length > 2 && (
                    <Badge variant="outline" className="font-normal">
                      +{designer.skills.length - 2} more
                    </Badge>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <div>{designer.followers} followers</div>
                  <div>{designer.projects} projects</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
