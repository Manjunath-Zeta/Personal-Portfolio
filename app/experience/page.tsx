import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Experience | Portfolio",
  description: "My professional experience and work history.",
}

const experiences = [
  {
    id: 1,
    role: "Senior Software Engineer",
    company: "Tech Innovators Inc.",
    duration: "Jan 2022 - Present",
    description: "Leading the frontend development team in building a scalable SaaS platform. Architected the core React components and reduced bundle size by 30%.",
  },
  {
    id: 2,
    role: "Software Engineer",
    company: "Digital Solutions LLC",
    duration: "Jun 2019 - Dec 2021",
    description: "Developed and maintained full-stack web applications using Node.js and React. Implemented real-time features using WebSockets and improved database query performance.",
  },
  {
    id: 3,
    role: "Junior Developer",
    company: "StartUp Co.",
    duration: "Jan 2018 - May 2019",
    description: "Assisted in building responsive landing pages and integrating REST APIs. Gained hands-on experience in agile methodologies.",
  },
]

export default function ExperiencePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-8 lg:py-20 max-w-4xl">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Experience</h1>
        <p className="text-xl text-muted-foreground">
          My professional timeline and roles.
        </p>
      </div>

      <div className="relative border-l border-muted-foreground/20 ml-3 md:ml-0 space-y-12">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-8 md:pl-0">
            {/* Timeline dot */}
            <div className="absolute -left-[5px] top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-background md:-left-1.5" />
            
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2 md:pl-8">
              <div>
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <h4 className="text-lg font-medium text-muted-foreground">{exp.company}</h4>
              </div>
              <div className="mt-1 md:mt-0 text-sm font-medium tracking-tight text-muted-foreground bg-muted px-3 py-1 rounded-full w-fit">
                {exp.duration}
              </div>
            </div>
            
            <div className="md:pl-8 mt-4 text-muted-foreground">
              <p className="leading-relaxed">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
