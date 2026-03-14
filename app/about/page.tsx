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
    <div className="container mx-auto px-4 py-12 md:px-8 lg:py-24 max-w-6xl">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight">
          About <span className="text-primary">Me</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
          {profile?.headline || "A glimpse into my professional journey and technical expertise."}
        </p>
      </div>

      <div className="mt-20 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white border-l-4 border-primary pl-6">My Journey</h2>
            <div className="space-y-6 text-lg text-muted-foreground/90 leading-relaxed whitespace-pre-wrap pl-7">
              {profile?.bio || "I am a passionate software engineer..."}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white border-l-4 border-primary pl-6">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-3 pl-7">
              {skills?.map((skill) => (
                <div
                  key={skill.id}
                  className="rounded-xl border border-white/10 bg-secondary/50 px-5 py-3 text-sm font-bold shadow-sm transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:scale-105"
                >
                  {skill.name}
                </div>
              ))}
              {(!skills || skills.length === 0) && <p className="text-muted-foreground italic text-sm">No skills listed yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
