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
    <div className="container mx-auto px-4 py-12 md:px-8 lg:py-24">
      <div className="space-y-6 mb-20">
        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight">
          Recent <span className="text-primary">Work</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
          A collection of stuff I&apos;ve built, from side projects to full-stack applications.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project) => (
          <Card key={project.id} className="flex flex-col h-full group bg-secondary/10 backdrop-blur-md border-white/5 hover:border-primary/20 transition-all duration-300 rounded-2xl overflow-hidden relative">
            {/* Hover Glow Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative aspect-video overflow-hidden">
              {project.image_url ? (
                <img src={project.image_url} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <div className="h-full w-full bg-muted/20 flex items-center justify-center text-primary/40 font-black text-4xl">
                  {project.title.charAt(0)}
                </div>
              )}
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </div>
            
            <CardHeader className="space-y-3 pb-4">
              <CardTitle className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                {project.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground/80 line-clamp-2 text-base leading-relaxed">
                {project.short_description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 pb-6">
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech: string) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-lg border border-white/5 bg-white/5 px-3 py-1 text-xs font-bold text-primary/80 uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
            
            <CardFooter className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 p-6 bg-white/[0.02]">
              {project.github_url && (
                <Button variant="outline" size="lg" asChild className="w-full border-white/10 hover:bg-white/5 font-bold h-12 rounded-xl">
                  <Link href={project.github_url} target="_blank">
                    <Github className="mr-2 h-4 w-4" /> Code
                  </Link>
                </Button>
              )}
              {project.live_url && (
                <Button size="lg" asChild className="w-full bg-primary hover:bg-primary/90 font-bold h-12 rounded-xl text-white">
                  <Link href={project.live_url} target="_blank">
                    <Globe className="mr-2 h-4 w-4" /> Live
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
        {(!projects || projects.length === 0) && (
          <p className="text-muted-foreground italic col-span-full text-center py-20 border-2 border-dashed border-white/5 rounded-2xl bg-white/[0.01]">
            No projects found. Add some in the admin panel!
          </p>
        )}
      </div>
    </div>
  )
}
