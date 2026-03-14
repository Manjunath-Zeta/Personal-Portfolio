import { Metadata } from "next"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Certifications | Portfolio",
  description: "My professional certifications and degrees.",
}

export const dynamic = "force-dynamic";

export default async function CertificationsPage() {
  const supabase = await createClient()
  const { data: certifications } = await supabase.from("certifications").select("*").order("issue_date", { ascending: false })

  return (
    <div className="container mx-auto px-4 py-12 md:px-8 lg:py-24 max-w-6xl">
      <div className="space-y-6 mb-20">
        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight">
          Licenses & <span className="text-primary">Certs</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
          Professional certifications and specialized training I&apos;ve completed to stay at the cutting edge.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {certifications?.map((cert) => (
          <Card key={cert.id} className="flex flex-col h-full group bg-secondary/10 backdrop-blur-md border-white/5 hover:border-primary/20 transition-all duration-300 rounded-2xl overflow-hidden relative">
            {/* Hover Glow Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <CardHeader className="space-y-3 pb-4">
              <CardTitle className="text-2xl font-bold text-white group-hover:text-primary transition-colors tracking-tight uppercase">
                {cert.name}
              </CardTitle>
              <CardDescription className="text-lg font-bold text-muted-foreground/80">
                {cert.issuer}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-6 border-t border-white/5 bg-white/[0.02]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black tracking-widest text-primary/70 uppercase">
                  {new Date(cert.issue_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                </p>
                {cert.url && (
                  <a 
                    href={cert.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-bold text-white hover:text-primary transition-colors underline underline-offset-4"
                  >
                    View Project
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {(!certifications || certifications.length === 0) && <p className="text-muted-foreground italic col-span-full text-center py-20 border-2 border-dashed border-white/5 rounded-2xl bg-white/[0.01]">No certifications found.</p>}
      </div>
    </div>
  )
}
