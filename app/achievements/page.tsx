import { Metadata } from "next"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Achievements | Portfolio",
  description: "Key professional achievements and awards.",
}

const achievements = [
  {
    id: 1,
    title: "Top Performer 2023",
    description: "Awarded Top Performer out of 50 engineers for outstanding delivery and leadership.",
    date: "Dec 2023",
  },
  {
    id: 2,
    title: "Hackathon Winner: AI for Good",
    description: "Built an accessibility tool for the visually impaired using computer vision in 48 hours.",
    date: "Sep 2022",
  },
]

export default function AchievementsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-8 lg:py-20 max-w-5xl">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Achievements</h1>
        <p className="text-xl text-muted-foreground">
          Recognitions, awards, and milestones.
        </p>
      </div>

      <div className="space-y-6">
        {achievements.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="mt-2 text-base">{item.description}</CardDescription>
                </div>
                <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                  {item.date}
                </span>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
