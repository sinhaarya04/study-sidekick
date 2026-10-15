import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Flame, BookOpen } from "lucide-react"

type Course = {
  id: string
  title: string
  source: string
  progress: number
  streak: number
  nextDue: string
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="border-2 flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardDescription>{course.source}</CardDescription>
            <CardTitle className="font-display text-xl mt-1">{course.title}</CardTitle>
          </div>
          <div className="flex items-center gap-1 text-sm text-orange-400">
            <Flame className="h-4 w-4" />
            <span>{course.streak}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-1">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2" />
          <p className="text-sm text-muted-foreground pt-2">Next flashcards due: {course.nextDue}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full group">
          Start Session
          <BookOpen className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
        </Button>
      </CardFooter>
    </Card>
  )
}
