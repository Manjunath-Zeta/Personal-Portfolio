"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function addCert(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { error } = await supabase.from("certifications").insert({
    user_id: user.id,
    name: formData.get("name"),
    issuer: formData.get("issuer"),
    issue_date: formData.get("issue_date"),
    url: formData.get("url") || null,
  })

  if (error) {
    console.error(error)
    throw new Error("Failed to add certification")
  }

  revalidatePath("/admin/certifications")
  revalidatePath("/certifications")
}

export async function deleteCert(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("certifications").delete().eq("id", id)

  if (error) {
    console.error(error)
    throw new Error("Failed to delete certification")
  }

  revalidatePath("/admin/certifications")
  revalidatePath("/certifications")
}

export async function updateCert(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const { error } = await supabase.from("certifications").update({
    name: formData.get("name"),
    issuer: formData.get("issuer"),
    issue_date: formData.get("issue_date"),
    url: formData.get("url") || null,
  }).eq("id", id)

  if (error) {
    console.error(error)
    throw new Error("Failed to update certification")
  }

  revalidatePath("/admin/certifications")
  revalidatePath("/certifications")
}
