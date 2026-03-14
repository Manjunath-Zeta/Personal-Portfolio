import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Github, Globe } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Projects | Portfolio",
  description: "A selection of my recent work.",
}

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data: projects } = await supabase.from("projects").select("*").order("featured", { ascending: false }).order("created_at", { ascending: false })

  return (
    <div className="container mx-auto px-4 py-12 md:px-8 lg:py-20">
      <div className="space-y-4 mb-12 max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Projects</h1>
        <p className="text-xl text-muted-foreground">
          A collection of stuff I&apos;ve built, from side projects to full-stack applications.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project) => (
          <Card key={project.id} className="flex flex-col h-full group">
            <CardHeader className="p-0 overflow-hidden rounded-t-xl aspect-video">
              {project.image_url ? (
                <img src={project.image_url} alt={project.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              ) : (
                <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground font-semibold">
                  {project.title.charAt(0)}
                </div>
              )}
            </CardHeader>
            <CardHeader>
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <CardDescription className="mt-2 line-clamp-3">
                {project.short_description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech: string) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-md border bg-muted/30 px-2.5 py-0.5 text-xs font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-4 border-t pt-6 bg-muted/50">
              {project.github_url && (
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href={project.github_url} target="_blank">
                    <Github className="mr-2 h-4 w-4" /> Code
                  </Link>
                </Button>
              )}
              {project.live_url && (
                <Button size="sm" asChild className="w-full">
                  <Link href={project.live_url} target="_blank">
                    <Globe className="mr-2 h-4 w-4" /> Live
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
        {(!projects || projects.length === 0) && <p className="text-muted-foreground italic col-span-full text-center py-20 border-2 border-dashed rounded-xl">No projects found. Add some in the admin panel!</p>}
      </div>
    </div>
  )
}
