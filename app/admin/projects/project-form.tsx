"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { addProject, updateProject } from "./actions"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"

interface ProjectFormProps {
  initialData?: any
  onCancel?: () => void
}

export function ProjectForm({ initialData, onCancel }: ProjectFormProps) {
  const isEditing = !!initialData

  const handleSubmit = async (formData: FormData) => {
    if (isEditing) {
      await updateProject(initialData.id, formData)
    } else {
      await addProject(formData)
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
        <CardTitle>{isEditing ? "Edit Project" : "Add New Project"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input name="title" required defaultValue={initialData?.title || ""} placeholder="Project Title" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Short Description</label>
            <Textarea name="short_description" required defaultValue={initialData?.short_description || ""} placeholder="A brief summary..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Technologies (comma separated)</label>
            <Input 
              name="technologies" 
              required 
              defaultValue={initialData?.technologies?.join(", ") || ""} 
              placeholder="React, Next.js, Tailwind..." 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">GitHub URL</label>
              <Input name="github_url" type="url" defaultValue={initialData?.github_url || ""} placeholder="https://github.com/..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Live Demo URL</label>
              <Input name="live_url" type="url" defaultValue={initialData?.live_url || ""} placeholder="https://..." />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              name="featured" 
              id="featured" 
              className="rounded" 
              defaultChecked={initialData?.featured || false}
            />
            <label htmlFor="featured" className="text-sm font-medium">Feature this on home page?</label>
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="w-full">
              {isEditing ? "Update Project" : "Create Project"}
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
