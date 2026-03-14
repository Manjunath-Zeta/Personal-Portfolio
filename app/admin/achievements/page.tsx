import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Trash2 } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export const metadata = { title: "Manage Achievements | Admin" }

export default async function AdminAchievementsPage() {
  const supabase = await createClient()
  
  const { data: achievements, error } = await supabase
    .from("achievements")
    .select("*")
    .order("date", { ascending: false })

  async function addAchievement(formData: FormData) {
    "use server"
    const sb = await createClient()
    const { data: { user } } = await sb.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    await sb.from("achievements").insert({
      user_id: user.id,
      title: formData.get("title"),
      description: formData.get("description"),
      date: formData.get("date") || null,
    })
    revalidatePath("/admin/achievements")
    revalidatePath("/achievements")
  }

  async function deleteAchievement(id: string) {
    "use server"
    const sb = await createClient()
    await sb.from("achievements").delete().eq("id", id)
    revalidatePath("/admin/achievements")
    revalidatePath("/achievements")
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
        <p className="text-muted-foreground">Manage your notable achievements and awards.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Achievement</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={addAchievement} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input name="title" required placeholder="Hackathon Winner..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input name="date" type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea name="description" required placeholder="Brief detail about the award..." />
                </div>
                <Button type="submit" className="w-full">Create Entry</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-7 space-y-4">
          <h2 className="text-xl font-semibold">Current Achievements</h2>
          {error ? (
            <p className="text-destructive">Failed to load achievements.</p>
          ) : achievements?.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground bg-muted/50 border-dashed">
              No achievements found. Add one to get started.
            </Card>
          ) : (
            <div className="space-y-4">
              {achievements?.map((achieve) => (
                <Card key={achieve.id} className="relative overflow-hidden group">
                   <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex justify-between pr-8">
                      {achieve.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {achieve.description}
                    </p>
                    {achieve.date && <p className="text-xs text-muted-foreground italic">Achieved on: {new Date(achieve.date).toLocaleDateString()}</p>}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <form action={async () => {
                        "use server"
                        await deleteAchievement(achieve.id)
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
