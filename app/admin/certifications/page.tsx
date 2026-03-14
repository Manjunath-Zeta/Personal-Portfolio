import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export const metadata = { title: "Manage Certifications | Admin" }

export default async function AdminCertificationsPage() {
  const supabase = await createClient()
  
  const { data: certs, error } = await supabase
    .from("certifications")
    .select("*")
    .order("issue_date", { ascending: false })

  async function addCert(formData: FormData) {
    "use server"
    const sb = await createClient()
    const { data: { user } } = await sb.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    await sb.from("certifications").insert({
      user_id: user.id,
      name: formData.get("name"),
      issuer: formData.get("issuer"),
      issue_date: formData.get("issue_date"),
      url: formData.get("url") || null,
    })
    revalidatePath("/admin/certifications")
    revalidatePath("/certifications")
  }

  async function deleteCert(id: string) {
    "use server"
    const sb = await createClient()
    await sb.from("certifications").delete().eq("id", id)
    revalidatePath("/admin/certifications")
    revalidatePath("/certifications")
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
        <p className="text-muted-foreground">Manage your degrees and certifications.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={addCert} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Certification Name</label>
                  <Input name="name" required placeholder="AWS Certified..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Issuer</label>
                  <Input name="issuer" required placeholder="Amazon" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Issue Date</label>
                  <Input name="issue_date" type="date" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Credential URL</label>
                  <Input name="url" type="url" placeholder="https://..." />
                </div>
                <Button type="submit" className="w-full">Create Entry</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-8 space-y-4">
          <h2 className="text-xl font-semibold">Current Certifications</h2>
          {error ? (
            <p className="text-destructive">Failed to load certifications.</p>
          ) : certs?.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground bg-muted/50 border-dashed">
              No certs found. Add one to get started.
            </Card>
          ) : (
            <div className="space-y-4">
              {certs?.map((cert) => (
                <Card key={cert.id} className="relative overflow-hidden group">
                   <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex justify-between pr-8">
                      {cert.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Issued by {cert.issuer} on {new Date(cert.issue_date).toLocaleDateString()}</p>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <form action={async () => {
                        "use server"
                        await deleteCert(cert.id)
                      }}>
                        <Button variant="destructive" size="icon" type="submit" title="Delete entry">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export const dynamic = 'force-dynamic';
