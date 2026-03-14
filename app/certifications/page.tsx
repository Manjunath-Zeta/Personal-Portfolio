import { Metadata } from "next"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Certifications | Portfolio",
  description: "My professional certifications and degrees.",
}

const certifications = [
  {
    id: 1,
    name: "AWS Certified Developer - Associate",
    issuer: "Amazon Web Services",
    date: "May 2023",
  },
  {
    id: 2,
    name: "React Native Specialist",
    issuer: "Meta",
    date: "Nov 2022",
  },
  {
    id: 3,
    name: "Frontend Development Path",
    issuer: "FreeCodeCamp",
    date: "Aug 2021",
  },
]

export default function CertificationsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-8 lg:py-20 max-w-5xl">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Certifications</h1>
        <p className="text-xl text-muted-foreground">
          Courses, degrees, and professional certifications I&apos;ve completed.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {certifications.map((cert) => (
          <Card key={cert.id} className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle>{cert.name}</CardTitle>
              <CardDescription>{cert.issuer}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium text-muted-foreground">Issued: {cert.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
