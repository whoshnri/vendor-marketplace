import { ArrowLeft, Mail, MapPin, ExternalLink, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"

// Sample designer data - in a real app, this would come from an API or database
const designers = [
  {
    id: "1",
    name: "Alex Morgan",
    avatar: "/diverse-person.png",
    coverImage: "/designer-cover.png",
    location: "San Francisco, CA",
    specialty: "UI/UX Designer",
    followers: "24.3k",
    following: "512",
    projects: 48,
    bio: "Creating intuitive digital experiences with a focus on accessibility and user-centered design. I've worked with startups and Fortune 500 companies to design products that millions of people use daily.",
    about:
      "I'm a UI/UX designer with over 8 years of experience creating digital products for clients across various industries. My approach combines user research, strategic thinking, and visual design to create experiences that are both beautiful and functional. I'm passionate about accessibility and ensuring that the products I design work for everyone.",
    featured: [
      {
        id: "1",
        title: "Minimalist Brand Identity Design",
        image: "/modern-brand-identity.png",
        description: "A clean and modern brand identity design for a tech startup.",
      },
      {
        id: "2",
        title: "Mobile App UI Design",
        image: "/mobile-app-ui-design.png",
        description: "A comprehensive UI design for a fitness tracking mobile application.",
      },
      {
        id: "3",
        title: "E-commerce Website Redesign",
        image: "/ecommerce-website-design.png",
        description: "Complete redesign of an e-commerce platform focusing on conversion optimization.",
      },
      {
        id: "4",
        title: "Dashboard Interface",
        image: "/general-dashboard-interface.png",
        description: "Analytics dashboard design for a SaaS platform.",
      },
      {
        id: "5",
        title: "Banking App Concept",
        image: "/placeholder.svg?key=xcbr8",
        description: "Modern mobile banking application concept with focus on simplicity.",
      },
      {
        id: "6",
        title: "Travel Platform Redesign",
        image: "/placeholder.svg?key=i0xt6",
        description: "User experience improvement for a travel booking platform.",
      },
    ],
    skills: [
      "UI Design",
      "UX Research",
      "Design Systems",
      "Prototyping",
      "Wireframing",
      "User Testing",
      "Figma",
      "Adobe Creative Suite",
    ],
    experience: [
      {
        company: "DesignCraft",
        role: "Senior UI/UX Designer",
        period: "2020 - Present",
        description: "Leading design for enterprise SaaS products and mentoring junior designers.",
      },
      {
        company: "TechVision",
        role: "Product Designer",
        period: "2017 - 2020",
        description: "Designed user interfaces for mobile applications and conducted user research.",
      },
      {
        company: "CreativeAgency",
        role: "UI Designer",
        period: "2015 - 2017",
        description: "Created visual designs for websites and digital marketing campaigns.",
      },
    ],
    education: [
      {
        institution: "Design Institute",
        degree: "Master's in Interaction Design",
        period: "2013 - 2015",
      },
      {
        institution: "State University",
        degree: "Bachelor's in Graphic Design",
        period: "2009 - 2013",
      },
    ],
    contact: {
      email: "alex.morgan@example.com",
      website: "www.alexmorgan.design",
      linkedin: "linkedin.com/in/alexmorgan",
      dribbble: "dribbble.com/alexmorgan",
    },
  },
]

export default function DesignerProfilePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the designer data based on the ID
  const designer = designers.find((d) => d.id === params.id) || designers[0]

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
        <div className="relative h-48 w-full bg-muted md:h-64">
          {designer.coverImage && (
            <Image
              src={designer.coverImage || "/placeholder.svg"}
              alt={`${designer.name}'s cover`}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
            <div className="container px-4 sm:px-8">
              <Button variant="ghost" size="sm" className="mb-4 text-white" asChild>
                <Link href="/designers">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Designers
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="container px-4 sm:px-8">
          <div className="relative -mt-12 flex flex-col items-center gap-4 md:-mt-16 md:flex-row md:items-end md:gap-6">
            <Avatar className="h-24 w-24 border-4 border-background md:h-32 md:w-32">
              <AvatarImage src={designer.avatar || "/placeholder.svg"} alt={designer.name} />
              <AvatarFallback>{designer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
              <h1 className="text-2xl font-bold md:text-3xl">{designer.name}</h1>
              <p className="text-muted-foreground">{designer.specialty}</p>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{designer.location}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button>Follow</Button>
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-6 md:justify-start">
            <div className="text-center">
              <p className="text-xl font-bold">{designer.projects}</p>
              <p className="text-sm text-muted-foreground">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{designer.followers}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{designer.following}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>

          <Tabs defaultValue="portfolio" className="mt-8">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
            <TabsContent value="portfolio" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {designer.featured.map((project) => (
                  <div key={project.id} className="group overflow-hidden rounded-lg border bg-card">
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{project.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="about" className="mt-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold">About Me</h2>
                <p className="mt-2 text-muted-foreground">{designer.about}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Skills</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {designer.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="resume" className="mt-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Experience</h2>
                <div className="mt-4 space-y-4">
                  {designer.experience.map((exp, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{exp.role}</h3>
                        <span className="text-sm text-muted-foreground">{exp.period}</span>
                      </div>
                      <p className="text-muted-foreground">{exp.company}</p>
                      <p className="text-sm">{exp.description}</p>
                      {index < designer.experience.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Education</h2>
                <div className="mt-4 space-y-4">
                  {designer.education.map((edu, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{edu.degree}</h3>
                        <span className="text-sm text-muted-foreground">{edu.period}</span>
                      </div>
                      <p className="text-muted-foreground">{edu.institution}</p>
                      {index < designer.education.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="contact" className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-medium">Email</h3>
                  </div>
                  <p className="mt-2 text-muted-foreground">{designer.contact.email}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-medium">Website</h3>
                  </div>
                  <a
                    href={`https://${designer.contact.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-muted-foreground hover:underline"
                  >
                    {designer.contact.website}
                  </a>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-medium">LinkedIn</h3>
                  </div>
                  <a
                    href={`https://${designer.contact.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-muted-foreground hover:underline"
                  >
                    {designer.contact.linkedin}
                  </a>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-medium">Dribbble</h3>
                  </div>
                  <a
                    href={`https://${designer.contact.dribbble}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-muted-foreground hover:underline"
                  >
                    {designer.contact.dribbble}
                  </a>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-medium">Send a Message</h3>
                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      placeholder="Message subject"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2"
                      placeholder="Your message"
                    />
                  </div>
                  <Button type="submit" className="w-full sm:w-auto">
                    Send Message
                  </Button>
                </form>
              </div>
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
