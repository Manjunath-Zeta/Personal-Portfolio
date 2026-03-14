"use client"

import * as React from "react"
import { ProjectForm } from "./project-form"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Trash2, Edit2 } from "lucide-react"
import { deleteProject } from "./actions"

interface ProjectManagerProps {
  projects: any[]
}

export function ProjectManager({ projects }: ProjectManagerProps) {
  const [editingProject, setEditingProject] = React.useState<any | null>(null)

  return (
    <div className="grid gap-8 md:grid-cols-12">
      <div className="md:col-span-5 space-y-4">
        <ProjectForm 
          key={editingProject?.id || "new"}
          initialData={editingProject} 
          onCancel={() => setEditingProject(null)} 
        />
      </div>

      <div className="md:col-span-7 space-y-4">
        <h2 className="text-xl font-semibold">Current Projects</h2>
        
        {projects.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground bg-muted/50 border-dashed">
            No project records found. Add one to get started.
          </Card>
        ) : (
          <div className="space-y-4">
            {projects.map((proj) => (
              <Card key={proj.id} className="relative overflow-hidden group">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex justify-between pr-20">
                    {proj.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {proj.short_description}
                  </p>
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setEditingProject(proj)}
                      title="Edit entry"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <form action={async () => {
                      if (confirm("Are you sure you want to delete this project?")) {
                        await deleteProject(proj.id)
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
