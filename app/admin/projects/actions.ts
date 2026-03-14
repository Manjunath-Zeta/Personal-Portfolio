"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function addProject(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const technologiesStr = formData.get("technologies") as string
  const technologies = technologiesStr ? technologiesStr.split(",").map((tech) => tech.trim()) : []

  const newProject = {
    user_id: user.id,
    title: formData.get("title"),
    short_description: formData.get("short_description"),
    full_description: formData.get("full_description") || null,
    github_url: formData.get("github_url") || null,
    live_url: formData.get("live_url") || null,
    image_url: formData.get("image_url") || null,
    technologies: technologies,
    featured: formData.get("featured") === "on",
  }

  const { error } = await supabase.from("projects").insert(newProject)

  if (error) {
    console.error(error)
    throw new Error("Failed to add project")
  }

  revalidatePath("/admin/projects")
  revalidatePath("/projects")
}

export async function deleteProject(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("projects").delete().eq("id", id)

  if (error) {
    console.error(error)
    throw new Error("Failed to delete project")
  }

  revalidatePath("/admin/projects")
  revalidatePath("/projects")
}
