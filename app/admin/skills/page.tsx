import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export const metadata = { title: "Manage Skills | Admin" }

export default async function AdminSkillsPage() {
  const supabase = await createClient()
  
  const { data: skills, error } = await supabase
    .from("skills")
    .select("*")
    .order("created_at", { ascending: false })

  async function addSkill(formData: FormData) {
    "use server"
    const sb = await createClient()
    const { data: { user } } = await sb.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    await sb.from("skills").insert({
      user_id: user.id,
      name: formData.get("name"),
      category: formData.get("category"),
    })
    revalidatePath("/admin/skills")
    revalidatePath("/about")
  }

  async function deleteSkill(id: string) {
    "use server"
    const sb = await createClient()
    await sb.from("skills").delete().eq("id", id)
    revalidatePath("/admin/skills")
    revalidatePath("/about")
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
        <p className="text-muted-foreground">Manage your technical skills and expertise.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Skill</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={addSkill} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Skill Name</label>
                  <Input name="name" required placeholder="React, Python, etc." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Input name="category" required placeholder="Frontend, Backend, Tools" />
                </div>
                <Button type="submit" className="w-full">Add Skill</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-8 space-y-4">
          <h2 className="text-xl font-semibold">Current Skills</h2>
          {error ? (
            <p className="text-destructive">Failed to load skills.</p>
          ) : skills?.length === 0 ? (
             <Card className="p-8 text-center text-muted-foreground bg-muted/50 border-dashed">
              No skills found. Add one to get started.
            </Card>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {skills?.map((skill) => (
                <Card key={skill.id} className="relative group p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{skill.name}</p>
                    <p className="text-xs text-muted-foreground">{skill.category}</p>
                  </div>
                  <form action={async () => {
                    "use server"
                    await deleteSkill(skill.id)
                  }}>
                    <Button variant="ghost" size="icon" type="submit" className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
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
