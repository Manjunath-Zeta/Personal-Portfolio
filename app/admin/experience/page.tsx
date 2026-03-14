import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { deleteExperience, addExperience } from "./actions"
import { Trash2 } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

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
        <p className="text-muted-foreground">Add new work experience or remove existing ones.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={addExperience} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company</label>
                  <Input name="company" required placeholder="Tech Corp" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <Input name="role" required placeholder="Software Engineer" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Input name="start_date" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Input name="end_date" type="date" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="current" id="current" className="rounded" />
                  <label htmlFor="current" className="text-sm font-medium">I currently work here</label>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea name="description" placeholder="Briefly describe your role..." />
                </div>
                <Button type="submit" className="w-full">Create Entry</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-8 space-y-4">
          <h2 className="text-xl font-semibold">Current Entries</h2>
          
          {error ? (
            <p className="text-destructive">Failed to load experiences.</p>
          ) : experiences?.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground bg-muted/50 border-dashed">
              No experience records found. Add one to get started.
            </Card>
          ) : (
            <div className="space-y-4">
              {experiences?.map((exp) => (
                <Card key={exp.id} className="relative overflow-hidden group">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex justify-between">
                      {exp.role} at {exp.company}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {new Date(exp.start_date).toLocaleDateString()} - {exp.current ? "Present" : exp.end_date ? new Date(exp.end_date).toLocaleDateString() : 'N/A'}
                    </p>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <form action={async () => {
                        "use server"
                        await deleteExperience(exp.id)
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
