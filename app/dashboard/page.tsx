import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle, BrainCircuit } from "lucide-react"
import { Card } from "@/components/ui/card"
import { getUser } from "@/lib/get-user"
import { supabaseServer } from "@/lib/supabase-server"
import CourseCard from "@/components/course-card"
import MicButton from "@/components/mic-button"

export default async function DashboardPage() {
  const user = await getUser()
  if (!user) redirect("/auth")

  const supabase = supabaseServer()
  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tighter sm:text-4xl">Your Courses</h1>
        <Button className="btn-primary">
          <span>
            <PlusCircle className="inline-block mr-2 h-5 w-5" />
            New Course
          </span>
        </Button>
      </div>

      {courses && courses.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <Card className="mt-16 border-2 border-dashed border-border rounded-lg p-12 bg-transparent">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="p-4 bg-secondary rounded-full border-2 border-border mb-4">
              <BrainCircuit className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Caffeinating Neurons...</h2>
            <p className="mt-2 text-muted-foreground text-balance">
              Your dashboard is ready. Click "New Course" to ingest your first course and create your AI study buddy.
            </p>
          </div>
        </Card>
      )}
      <MicButton />
    </div>
  )
}
