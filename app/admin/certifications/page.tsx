import { createClient } from "@/lib/supabase/server"
import { CertManager } from "./cert-manager"

export const metadata = { title: "Manage Certifications | Admin" }

export default async function AdminCertificationsPage() {
  const supabase = await createClient()
  
  const { data: certs, error } = await supabase
    .from("certifications")
    .select("*")
    .order("issue_date", { ascending: false })

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
        <p className="text-muted-foreground">Manage your degrees and certifications. You can now add, edit, or delete entries.</p>
      </div>

      {error ? (
        <p className="text-destructive">Failed to load certifications.</p>
      ) : (
        <CertManager certs={certs || []} />
      )}
    </div>
  )
}
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
