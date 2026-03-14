import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { addProject, deleteProject } from "./actions"
import { Trash2 } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export const metadata = { title: "Manage Projects | Admin" }

export default async function AdminProjectsPage() {
  const supabase = await createClient()
  
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">Add new projects to showcase or remove existing ones.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Project</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={addProject} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input name="title" required placeholder="Project Title" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Short Description</label>
                  <Textarea name="short_description" required placeholder="A brief summary..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Technologies (comma separated)</label>
                  <Input name="technologies" required placeholder="React, Next.js, Tailwind..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">GitHub URL</label>
                    <Input name="github_url" type="url" placeholder="https://github.com/..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Live Demo URL</label>
                    <Input name="live_url" type="url" placeholder="https://..." />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="featured" id="featured" className="rounded" />
                  <label htmlFor="featured" className="text-sm font-medium">Feature this on home page?</label>
                </div>
                <Button type="submit" className="w-full">Create Project</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-7 space-y-4">
          <h2 className="text-xl font-semibold">Current Projects</h2>
          
          {error ? (
            <p className="text-destructive">Failed to load projects.</p>
          ) : projects?.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground bg-muted/50 border-dashed">
              No project records found. Add one to get started.
            </Card>
          ) : (
            <div className="space-y-4">
              {projects?.map((proj) => (
                <Card key={proj.id} className="relative overflow-hidden group">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex justify-between pr-8">
                      {proj.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {proj.short_description}
                    </p>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <form action={async () => {
                        "use server"
                        await deleteProject(proj.id)
                      }}>
                        <Button variant="destructive" size="icon" type="submit" title="Delete entry">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
