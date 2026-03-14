"use client"

import * as React from "react"
import { CertForm } from "./cert-form"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Trash2, Edit2 } from "lucide-react"
import { deleteCert } from "./actions"

interface CertManagerProps {
  certs: any[]
}

export function CertManager({ certs }: CertManagerProps) {
  const [editingCert, setEditingCert] = React.useState<any | null>(null)

  return (
    <div className="grid gap-8 md:grid-cols-12">
      <div className="md:col-span-4 space-y-4">
        <CertForm 
          key={editingCert?.id || "new"}
          initialData={editingCert} 
          onCancel={() => setEditingCert(null)} 
        />
      </div>

      <div className="md:col-span-8 space-y-4">
        <h2 className="text-xl font-semibold">Current Certifications</h2>
        
        {certs.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground bg-muted/50 border-dashed">
            No certs found. Add one to get started.
          </Card>
        ) : (
          <div className="space-y-4">
            {certs.map((cert) => (
              <Card key={cert.id} className="relative overflow-hidden group">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex justify-between pr-20">
                    {cert.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Issued by {cert.issuer} on {new Date(cert.issue_date).toLocaleDateString()}
                  </p>
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setEditingCert(cert)}
                      title="Edit entry"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <form action={async () => {
                      if (confirm("Are you sure you want to delete this certification?")) {
                        await deleteCert(cert.id)
                      }
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
  )
}
