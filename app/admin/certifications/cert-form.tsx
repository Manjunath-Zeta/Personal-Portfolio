"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addCert, updateCert } from "./actions"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"

interface CertFormProps {
  initialData?: any
  onCancel?: () => void
}

export function CertForm({ initialData, onCancel }: CertFormProps) {
  const isEditing = !!initialData

  const handleSubmit = async (formData: FormData) => {
    if (isEditing) {
      await updateCert(initialData.id, formData)
    } else {
      await addCert(formData)
    }
    if (onCancel) onCancel()
  }

  return (
    <Card className="relative">
      {isEditing && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2" 
          onClick={onCancel}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Certification" : "Add New Entry"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Certification Name</label>
            <Input name="name" required defaultValue={initialData?.name || ""} placeholder="AWS Certified..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Issuer</label>
            <Input name="issuer" required defaultValue={initialData?.issuer || ""} placeholder="Amazon" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Issue Date</label>
            <Input name="issue_date" type="date" required defaultValue={initialData?.issue_date || ""} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Credential URL</label>
            <Input name="url" type="url" defaultValue={initialData?.url || ""} placeholder="https://..." />
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="w-full">
              {isEditing ? "Update Entry" : "Create Entry"}
            </Button>
            {isEditing && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
