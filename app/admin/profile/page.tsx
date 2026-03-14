import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ProfileForm } from "./profile-form"

export const metadata = { title: "Profile Info | Admin" }

export default async function AdminProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <div>Not authenticated</div>
  }

  const { data: profile } = await supabase.from("profile_info").select("*").eq("id", user.id).single()

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
      profile_image_url: formData.get("profile_image_url"),
    }

    console.log("Updating profile with:", updates)

    const { error } = await sb.from("profile_info").upsert(updates)
    if (error) {
      console.error("Supabase Error:", error)
      throw error
    } else {
      console.log("Profile updated successfully in DB")
    }

    revalidatePath("/admin/profile")
    revalidatePath("/")
    revalidatePath("/about")
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile & About</h1>
          <p className="text-muted-foreground">Update your personal information used across the site.</p>
        </div>
        <div className="text-[10px] text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
          ID: {user.id}
        </div>
      </div>

      <ProfileForm 
        profile={profile} 
        userId={user.id} 
        updateProfile={updateProfile} 
      />
    </div>
  )
}
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
