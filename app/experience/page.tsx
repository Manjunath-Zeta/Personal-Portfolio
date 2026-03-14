import { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Experience | Portfolio",
  description: "My professional experience and work history.",
}

export const dynamic = "force-dynamic";

import { ExperienceList } from "@/components/experience-list"

export default async function ExperiencePage() {
  const supabase = await createClient()
  const { data: experiences } = await supabase
    .from("experience")
    .select("*")
    .order("start_date", { ascending: false })

  return (
    <div className="container mx-auto px-4 py-12 md:px-8 lg:py-24 max-w-6xl">
      <div className="space-y-6 mb-20">
        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight">
          Professional <span className="text-primary">Journey</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
          A timeline of my work experience, roles, and the impact I&apos;ve made across different organizations.
        </p>
      </div>

      <ExperienceList experiences={experiences} />
    </div>
  )
}
