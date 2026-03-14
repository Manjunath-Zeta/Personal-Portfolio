"use client"

import * as React from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/admin/image-upload"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface ProfileFormProps {
  profile: any
  userId: string
  updateProfile: (formData: FormData) => Promise<void>
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save Changes"}
    </Button>
  )
}

export function ProfileForm({ profile, userId, updateProfile }: ProfileFormProps) {
  const [imageUrl, setImageUrl] = React.useState(profile?.profile_image_url || "")

  const handleAction = async (formData: FormData) => {
    formData.set("profile_image_url", imageUrl)
    try {
      await updateProfile(formData)
      alert("Profile updated successfully!")
    } catch (error) {
      console.error(error)
      alert("Failed to update profile. Check console for details.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleAction} className="space-y-6">
          <input type="hidden" name="profile_image_url" value={imageUrl} />
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Profile Picture</label>
            <ImageUpload 
              value={imageUrl} 
              onChange={setImageUrl} 
              onRemove={() => setImageUrl("")} 
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input name="full_name" required defaultValue={profile?.full_name || ""} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input name="email" type="email" required defaultValue={profile?.email || ""} />
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

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  )
}
