import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Portfolio",
  description: "About my professional background and skills.",
}

const skills = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Languages" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Supabase", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Git", category: "Tools" },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-8 lg:py-20 max-w-5xl">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">About Me</h1>
        <p className="text-xl text-muted-foreground">
          A glimpse into my professional journey and technical expertise.
        </p>
      </div>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">My Journey</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I am a passionate software engineer with a strong foundation in modern web technologies. Focuses on building responsive, accessible, and performant user interfaces using React and Next.js.
            </p>
            <p>
              Over the years, I have worked on various projects ranging from simple landing pages to complex enterprise web applications. I enjoy solving tricky problems and learning new skills along the way.
            </p>
            <p>
              When I&apos;m not coding, you can find me exploring new technologies, writing technical blogs, or contributing to open source.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Skills & Technologies</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="rounded-full border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
