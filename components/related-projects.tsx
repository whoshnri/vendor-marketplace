import Image from "next/image"
import Link from "next/link"

// Sample related projects
const relatedProjects = [
  {
    id: "5",
    title: "3D Product Visualization",
    image: "/3d-product-visualization.png",
  },
  {
    id: "6",
    title: "Social Media Campaign",
    image: "/placeholder.svg?key=5lus1",
  },
  {
    id: "7",
    title: "Packaging Design Collection",
    image: "/placeholder.svg?height=120&width=200&query=packaging+design+collection",
  },
]

export function RelatedProjects() {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-medium">More from this creator</h3>
      <div className="mt-4 space-y-4">
        {relatedProjects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`} className="flex gap-3 hover:opacity-80">
            <div className="h-16 w-24 overflow-hidden rounded">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={200}
                height={120}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <h4 className="line-clamp-2 text-sm font-medium">{project.title}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
