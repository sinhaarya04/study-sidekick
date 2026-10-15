import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3 } from "lucide-react"

type PracticePack = {
  id: string
  topicTags: string[]
  questionCount: number
  difficultyMix: { easy: number; medium: number; hard: number }
}

export default function PracticeCard({ pack }: { pack: PracticePack }) {
  return (
    <Card className="border-2 flex flex-col hover:border-primary/50 transition-colors duration-300">
      <CardHeader>
        <div className="flex flex-wrap gap-2">
          {pack.topicTags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="font-display text-xl pt-2">Practice: {pack.topicTags[0]}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{pack.questionCount} Questions</span>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>
              {pack.difficultyMix.easy}E / {pack.difficultyMix.medium}M / {pack.difficultyMix.hard}H
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full btn-primary">
          <span>Start Drill</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
