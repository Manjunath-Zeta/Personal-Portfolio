import { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Experience | Portfolio",
  description: "My professional experience and work history.",
}

export default async function ExperiencePage() {
  const supabase = await createClient()
  const { data: experiences } = await supabase
    .from("experience")
    .select("*")
    .order("start_date", { ascending: false })

  return (
    <div className="container mx-auto px-4 py-12 md:px-8 lg:py-20 max-w-4xl">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Experience</h1>
        <p className="text-xl text-muted-foreground">
          My professional timeline and roles.
        </p>
      </div>

      <div className="relative border-l border-muted-foreground/20 ml-3 md:ml-0 space-y-12">
        {experiences?.map((exp) => (
          <div key={exp.id} className="relative pl-8 md:pl-0">
            {/* Timeline dot */}
            <div className="absolute -left-[5px] top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-background md:-left-1.5" />
            
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2 md:pl-8">
              <div>
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <h4 className="text-lg font-medium text-muted-foreground">{exp.company}</h4>
              </div>
              <div className="mt-1 md:mt-0 text-sm font-medium tracking-tight text-muted-foreground bg-muted px-3 py-1 rounded-full w-fit whitespace-nowrap">
                {new Date(exp.start_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })} - {exp.current ? "Present" : exp.end_date ? new Date(exp.end_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : ""}
              </div>
            </div>
            
            <div className="md:pl-8 mt-4 text-muted-foreground">
              <p className="leading-relaxed whitespace-pre-wrap">{exp.description}</p>
            </div>
          </div>
        ))}
        {(!experiences || experiences.length === 0) && <p className="text-muted-foreground italic pl-8">No experience history found.</p>}
      </div>
    </div>
  )
}
