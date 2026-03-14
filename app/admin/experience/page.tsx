import { createClient } from "@/lib/supabase/server"
import { ExperienceManager } from "./experience-manager"

export const metadata = { title: "Manage Experience | Admin" }

export default async function AdminExperiencePage() {
  const supabase = await createClient()
  
  const { data: experiences, error } = await supabase
    .from("experience")
    .select("*")
    .order("start_date", { ascending: false })

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
        <p className="text-muted-foreground">Manage your work experience. You can now add, edit, or delete entries.</p>
      </div>

      {error ? (
        <p className="text-destructive">Failed to load experiences.</p>
      ) : (
        <ExperienceManager experiences={experiences || []} />
      )}
    </div>
  )
}
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
