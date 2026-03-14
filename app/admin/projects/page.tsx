import { createClient } from "@/lib/supabase/server"
import { ProjectManager } from "./project-manager"

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
        <p className="text-muted-foreground">Manage your portfolio projects. You can now add, edit, or delete entries.</p>
      </div>

      {error ? (
        <p className="text-destructive">Failed to load projects.</p>
      ) : (
        <ProjectManager projects={projects || []} />
      )}
    </div>
  )
}
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
