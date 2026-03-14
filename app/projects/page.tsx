import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Github, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "Projects | Portfolio",
  description: "A selection of my recent work.",
}

const projects = [
  {
    id: 1,
    title: "E-Commerce Suite",
    description: "A full-stack e-commerce solution with Next.js, Stripe, and Supabase. Features real-time inventory and an admin dashboard.",
    technologies: ["Next.js", "Stripe", "Supabase", "Tailwind"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 2,
    title: "TaskFlow Manager",
    description: "A drag-and-drop task management tool inspired by Trello. Uses React DnD and Firebase for real-time synchronization.",
    technologies: ["React", "Firebase", "Framer Motion"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 3,
    title: "AI Image Generator",
    description: "Web application that wraps around OpenAI's DALL-E API. Includes prompt history, image saving, and user authentication.",
    technologies: ["Next.js", "OpenAI", "Prisma"],
    github: "https://github.com",
    live: "https://example.com",
  },
]

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-8 lg:py-20">
      <div className="space-y-4 mb-12 max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Projects</h1>
        <p className="text-xl text-muted-foreground">
          A collection of stuff I&apos;ve built, from side projects to full-stack applications.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col h-full group">
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription className="mt-2 line-clamp-3">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-4 border-t pt-6 bg-muted/50">
              {project.github && (
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href={project.github} target="_blank">
                    <Github className="mr-2 h-4 w-4" /> Code
                  </Link>
                </Button>
              )}
              {project.live && (
                <Button size="sm" asChild className="w-full">
                  <Link href={project.live} target="_blank">
                    <Globe className="mr-2 h-4 w-4" /> Live
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
