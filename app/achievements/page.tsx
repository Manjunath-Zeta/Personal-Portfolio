import { Metadata } from "next"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Achievements | Portfolio",
  description: "Key professional achievements and awards.",
}

export default async function AchievementsPage() {
  const supabase = await createClient()
  const { data: achievements } = await supabase.from("achievements").select("*").order("date", { ascending: false })

  return (
    <div className="container mx-auto px-4 py-12 md:px-8 lg:py-20 max-w-5xl">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Achievements</h1>
        <p className="text-xl text-muted-foreground">
          Recognitions, awards, and milestones.
        </p>
      </div>

      <div className="space-y-6">
        {achievements?.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="mt-2 text-base leading-relaxed">{item.description}</CardDescription>
                </div>
                {item.date && (
                  <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                    {new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                  </span>
                )}
              </div>
            </CardHeader>
          </Card>
        ))}
        {(!achievements || achievements.length === 0) && <p className="text-muted-foreground italic">No achievements listed yet.</p>}
      </div>
    </div>
  )
}
