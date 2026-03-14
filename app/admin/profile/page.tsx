import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export const metadata = { title: "Profile Info | Admin" }

export default async function AdminProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null

  if (user) {
    const { data } = await supabase.from("profile_info").select("*").eq("id", user.id).single()
    profile = data
  }

  async function updateProfile(formData: FormData) {
    "use server"
    const sb = await createClient()
    const { data: { user } } = await sb.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    const updates = {
      id: user.id,
      full_name: formData.get("full_name"),
      headline: formData.get("headline"),
      bio: formData.get("bio"),
      email: formData.get("email"),
      github_url: formData.get("github_url"),
      linkedin_url: formData.get("linkedin_url"),
    }

    const { error } = await sb.from("profile_info").upsert(updates)
    if (error) console.error(error)

    revalidatePath("/admin/profile")
    revalidatePath("/")
    revalidatePath("/about")
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile & About</h1>
        <p className="text-muted-foreground">Update your personal information used across the site.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateProfile} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input name="full_name" required defaultValue={profile?.full_name || ""} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input name="email" type="email" required defaultValue={profile?.email || user?.email || ""} />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Headline</label>
              <Input name="headline" placeholder="Software Engineer" defaultValue={profile?.headline || ""} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              <Textarea 
                name="bio" 
                placeholder="A compelling summary of yourself..." 
                className="min-h-[120px]"
                defaultValue={profile?.bio || ""} 
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">GitHub URL</label>
                <Input name="github_url" type="url" defaultValue={profile?.github_url || ""} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">LinkedIn URL</label>
                <Input name="linkedin_url" type="url" defaultValue={profile?.linkedin_url || ""} />
              </div>
            </div>

            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
