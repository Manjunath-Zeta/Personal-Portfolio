import { createClient } from "@/lib/supabase/server"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Fetch counts from all tables
  const [
    { count: experienceCount },
    { count: projectsCount },
    { count: certsCount },
    { count: skillsCount }
  ] = await Promise.all([
    supabase.from("experience").select("*", { count: 'exact', head: true }),
    supabase.from("projects").select("*", { count: 'exact', head: true }),
    supabase.from("certifications").select("*", { count: 'exact', head: true }),
    supabase.from("skills").select("*", { count: 'exact', head: true })
  ])

  const stats = [
    { label: 'Experience', count: experienceCount || 0 },
    { label: 'Projects', count: projectsCount || 0 },
    { label: 'Certifications', count: certsCount || 0 },
    { label: 'Skills', count: skillsCount || 0 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back. Here is your portfolio overview.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-white/5 bg-secondary/30 text-card-foreground shadow-sm p-6 group hover:border-primary/20 transition-all">
            <h3 className="font-semibold text-sm tracking-tight text-muted-foreground group-hover:text-primary transition-colors">{stat.label} Entries</h3>
            <div className="mt-2 text-3xl font-bold text-white">{stat.count}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/10">
        <h2 className="text-lg font-bold text-white mb-2">Pro Tip</h2>
        <p className="text-muted-foreground">
          Use the navigation menu to update your content. Changes made here will reflect instantly on your public portfolio pages with the premium dark theme.
        </p>
      </div>
    </div>
  )
}
