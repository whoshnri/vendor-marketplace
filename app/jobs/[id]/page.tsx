import { ArrowLeft, Briefcase, MapPin, Clock, Share2, BookmarkPlus } from "lucide-react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Sample job data - in a real app, this would come from an API or database
const jobs = [
  {
    id: "1",
    title: "Senior UI/UX Designer",
    company: {
      name: "Designify",
      logo: "/diverse-group.png",
      location: "San Francisco, CA",
      about:
        "Designify is a leading design agency that creates exceptional digital experiences for forward-thinking companies. With a team of 50+ designers and developers, we help businesses transform their ideas into beautiful, functional products.",
      website: "www.designify.com",
      employees: "50-100",
      industry: "Design Services",
    },
    type: "Full-time",
    location: "Remote",
    level: "Senior Level",
    salary: "$90k - $120k",
    posted: "2 days ago",
    description:
      "We're looking for a Senior UI/UX Designer to join our team and help create exceptional user experiences for our products. You'll work closely with product managers, developers, and other designers to design intuitive interfaces for web and mobile applications.",
    responsibilities: [
      "Lead the UI/UX design process from concept to implementation",
      "Create wireframes, prototypes, and high-fidelity designs",
      "Conduct user research and usability testing",
      "Develop and maintain design systems",
      "Collaborate with cross-functional teams to ensure design quality",
      "Mentor junior designers and provide feedback",
    ],
    requirements: [
      "5+ years of experience in UI/UX design",
      "Strong portfolio demonstrating your design process and solutions",
      "Proficiency in design tools such as Figma, Sketch, or Adobe XD",
      "Experience with design systems and component libraries",
      "Understanding of accessibility standards and best practices",
      "Excellent communication and collaboration skills",
    ],
    benefits: [
      "Competitive salary and equity options",
      "Flexible work hours and remote work policy",
      "Health, dental, and vision insurance",
      "401(k) matching",
      "Professional development budget",
      "Home office stipend",
    ],
    skills: ["Figma", "UI Design", "User Research", "Prototyping", "Design Systems", "Wireframing"],
    applicants: 24,
    similarJobs: [
      {
        id: "2",
        title: "Product Designer",
        company: "TechVision",
        location: "San Francisco, CA (Hybrid)",
        type: "Full-time",
      },
      {
        id: "3",
        title: "UX Researcher",
        company: "DataInsight",
        location: "Remote",
        type: "Full-time",
      },
      {
        id: "4",
        title: "UI Designer",
        company: "CreativeStudio",
        location: "New York, NY",
        type: "Contract",
      },
    ],
  },
]

export default function JobDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the job data based on the ID
  const job = jobs.find((j) => j.id === params.id) || jobs[0]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <Button>Post a Job</Button>
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 sm:px-8 md:py-8">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/jobs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Link>
          </Button>

          <div className="grid gap-6 md:grid-cols-[1fr_300px]">
            <div className="space-y-6">
              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={job.company.logo || "/placeholder.svg"} alt={job.company.name} />
                      <AvatarFallback>{job.company.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-2xl font-bold">{job.title}</h1>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <span>{job.company.name}</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          <span>{job.level}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Posted {job.posted}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <BookmarkPlus className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant={job.type === "Full-time" ? "default" : "outline"}>{job.type}</Badge>
                  <Badge variant="secondary">{job.salary}</Badge>
                  <Badge variant="outline">{job.applicants} applicants</Badge>
                </div>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-xl font-semibold">Job Description</h2>
                <p className="mt-2 text-muted-foreground">{job.description}</p>

                <h3 className="mt-6 font-medium">Responsibilities</h3>
                <ul className="mt-2 space-y-2 pl-6">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="list-disc text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-6 font-medium">Requirements</h3>
                <ul className="mt-2 space-y-2 pl-6">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="list-disc text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-6 font-medium">Benefits</h3>
                <ul className="mt-2 space-y-2 pl-6">
                  {job.benefits.map((item, index) => (
                    <li key={index} className="list-disc text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-6 font-medium">Skills</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-xl font-semibold">Apply for this position</h2>
                <p className="mt-2 text-muted-foreground">
                  Please fill out the form below to apply for this position. We'll review your application and get back
                  to you as soon as possible.
                </p>

                <form className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium">
                        First Name
                      </label>
                      <input
                        id="first-name"
                        type="text"
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        placeholder="Your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium">
                        Last Name
                      </label>
                      <input
                        id="last-name"
                        type="text"
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        placeholder="Your last name"
                      />
                    </div>
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
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="resume" className="text-sm font-medium">
                      Resume/CV
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="resume"
                        type="file"
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">PDF, DOC, or DOCX. Max 5MB.</p>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="portfolio" className="text-sm font-medium">
                      Portfolio URL (Optional)
                    </label>
                    <input
                      id="portfolio"
                      type="url"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      placeholder="https://your-portfolio.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cover-letter" className="text-sm font-medium">
                      Cover Letter
                    </label>
                    <textarea
                      id="cover-letter"
                      className="min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2"
                      placeholder="Tell us why you're a good fit for this position"
                    />
                  </div>
                  <Button type="submit" className="w-full sm:w-auto">
                    Submit Application
                  </Button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About the Company</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={job.company.logo || "/placeholder.svg"} alt={job.company.name} />
                      <AvatarFallback>{job.company.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{job.company.name}</h3>
                      <p className="text-sm text-muted-foreground">{job.company.location}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{job.company.about}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Website</span>
                      <a
                        href={`https://${job.company.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {job.company.website}
                      </a>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Industry</span>
                      <span>{job.company.industry}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Company size</span>
                      <span>{job.company.employees} employees</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Similar Jobs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {job.similarJobs.map((similarJob) => (
                    <Link key={similarJob.id} href={`/jobs/${similarJob.id}`} className="block">
                      <div className="rounded-lg border p-3 hover:bg-muted/50">
                        <h3 className="font-medium">{similarJob.title}</h3>
                        <p className="text-sm text-muted-foreground">{similarJob.company}</p>
                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{similarJob.location}</span>
                          <Badge variant="outline" className="ml-auto">
                            {similarJob.type}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
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
