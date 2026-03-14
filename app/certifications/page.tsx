import { Metadata } from "next"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Certifications | Portfolio",
  description: "My professional certifications and degrees.",
}

export default async function CertificationsPage() {
  const supabase = await createClient()
  const { data: certifications } = await supabase.from("certifications").select("*").order("issue_date", { ascending: false })

  return (
    <div className="container mx-auto px-4 py-12 md:px-8 lg:py-20 max-w-5xl">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Certifications</h1>
        <p className="text-xl text-muted-foreground">
          Courses, degrees, and professional certifications I&apos;ve completed.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {certifications?.map((cert) => (
          <Card key={cert.id} className="hover:border-primary transition-colors flex flex-col h-full group">
            <CardHeader>
              <CardTitle className="text-xl">{cert.name}</CardTitle>
              <CardDescription className="text-lg font-medium text-foreground/80">{cert.issuer}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <p className="text-sm font-medium text-muted-foreground">
                Issued: {new Date(cert.issue_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
              </p>
              {cert.url && (
                <a 
                  href={cert.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
                >
                  View Credential
                </a>
              )}
            </CardContent>
          </Card>
        ))}
        {(!certifications || certifications.length === 0) && <p className="text-muted-foreground italic col-span-full">No certifications listed yet.</p>}
      </div>
    </div>
  )
}
