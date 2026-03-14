"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function addExperience(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const current = formData.get("current") === "on"

  const newExp = {
    user_id: user.id,
    company: formData.get("company"),
    role: formData.get("role"),
    location: formData.get("location") || null,
    start_date: formData.get("start_date"),
    end_date: current ? null : formData.get("end_date"),
    current,
    description: formData.get("description"),
  }

  const { error } = await supabase.from("experience").insert(newExp)

  if (error) {
    console.error(error)
    throw new Error("Failed to add experience")
  }

  revalidatePath("/admin/experience")
  revalidatePath("/experience")
}

export async function deleteExperience(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("experience").delete().eq("id", id)

  if (error) {
    console.error(error)
    throw new Error("Failed to delete experience")
  }

  revalidatePath("/admin/experience")
  revalidatePath("/experience")
}

export async function updateExperience(id: string, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const current = formData.get("current") === "on"

  const updatedExp = {
    company: formData.get("company"),
    role: formData.get("role"),
    location: formData.get("location") || null,
    start_date: formData.get("start_date"),
    end_date: current ? null : formData.get("end_date"),
    current,
    description: formData.get("description"),
  }

  const { error } = await supabase.from("experience").update(updatedExp).eq("id", id)

  if (error) {
    console.error(error)
    throw new Error("Failed to update experience")
  }

  revalidatePath("/admin/experience")
  revalidatePath("/experience")
}
