"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { addExperience, updateExperience } from "./actions"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"

interface ExperienceFormProps {
  initialData?: any
  onCancel?: () => void
}

export function ExperienceForm({ initialData, onCancel }: ExperienceFormProps) {
  const isEditing = !!initialData
  const [isCurrent, setIsCurrent] = React.useState(initialData?.current || false)

  const handleSubmit = async (formData: FormData) => {
    if (isEditing) {
      await updateExperience(initialData.id, formData)
    } else {
      await addExperience(formData)
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
        <CardTitle>{isEditing ? "Edit Experience" : "Add New Experience"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Company</label>
            <Input name="company" required defaultValue={initialData?.company || ""} placeholder="Tech Corp" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <Input name="role" required defaultValue={initialData?.role || ""} placeholder="Software Engineer" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <Input 
                name="start_date" 
                type="date" 
                required 
                defaultValue={initialData?.start_date || ""} 
              />
            </div>
            {!isCurrent && (
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input 
                  name="end_date" 
                  type="date" 
                  defaultValue={initialData?.end_date || ""} 
                />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              name="current" 
              id="current" 
              className="rounded" 
              checked={isCurrent}
              onChange={(e) => setIsCurrent(e.target.checked)}
            />
            <label htmlFor="current" className="text-sm font-medium">I currently work here</label>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea 
              name="description" 
              defaultValue={initialData?.description || ""} 
              placeholder="Briefly describe your role..." 
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
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
