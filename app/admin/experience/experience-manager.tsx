"use client"

import * as React from "react"
import { ExperienceForm } from "./experience-form"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Trash2, Edit2 } from "lucide-react"
import { deleteExperience } from "./actions"

interface ExperienceManagerProps {
  experiences: any[]
}

export function ExperienceManager({ experiences }: ExperienceManagerProps) {
  const [editingExperience, setEditingExperience] = React.useState<any | null>(null)

  return (
    <div className="grid gap-8 md:grid-cols-12">
      <div className="md:col-span-4 space-y-4">
        <ExperienceForm 
          key={editingExperience?.id || "new"}
          initialData={editingExperience} 
          onCancel={() => setEditingExperience(null)} 
        />
      </div>

      <div className="md:col-span-8 space-y-4">
        <h2 className="text-xl font-semibold">Current Entries</h2>
        
        {experiences.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground bg-muted/50 border-dashed">
            No experience records found. Add one to get started.
          </Card>
        ) : (
          <div className="space-y-4">
            {experiences.map((exp) => (
              <Card key={exp.id} className="relative overflow-hidden group">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex justify-between pr-20">
                    {exp.role} at {exp.company}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {new Date(exp.start_date).toLocaleDateString()} - {exp.current ? "Present" : exp.end_date ? new Date(exp.end_date).toLocaleDateString() : 'N/A'}
                  </p>
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setEditingExperience(exp)}
                      title="Edit entry"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <form action={async () => {
                      if (confirm("Are you sure you want to delete this experience?")) {
                        await deleteExperience(exp.id)
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
