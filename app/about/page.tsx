import { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "About | Portfolio",
  description: "About my professional background and skills.",
}

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const supabase = await createClient()
  const { data: profile } = await supabase.from("profile_info").select("*").single()
  const { data: skills } = await supabase.from("skills").select("*").order("category")

  return (
    <div className="container mx-auto px-4 py-12 md:px-8 lg:py-20 max-w-5xl">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">About Me</h1>
        <p className="text-xl text-muted-foreground">
          {profile?.headline || "A glimpse into my professional journey and technical expertise."}
        </p>
      </div>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">My Journey</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {profile?.bio || "I am a passionate software engineer..."}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Skills & Technologies</h2>
          <div className="flex flex-wrap gap-3">
            {skills?.map((skill) => (
              <div
                key={skill.id}
                className="rounded-full border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {skill.name}
              </div>
            ))}
            {(!skills || skills.length === 0) && <p className="text-muted-foreground italic text-sm">No skills listed yet.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
