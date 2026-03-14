export const metadata = {
  title: "Admin Dashboard | Portfolio",
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back. Manage your portfolio content here.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Quick Stats Cards */}
        {['Experience', 'Projects', 'Certifications', 'Skills'].map((stat) => (
          <div key={stat} className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="font-semibold text-sm tracking-tight text-muted-foreground">{stat} Entries</h3>
            <div className="mt-2 text-3xl font-bold">--</div>
          </div>
        ))}
      </div>
    </div>
  )
}
