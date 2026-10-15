import { createClient } from "@/lib/supabase/server"

export default async function CoursesPage() {
  const supabase = createClient()
  const { data: courses } = await supabase.from("courses").select()

  return (
    <div className="container mx-auto p-8">
      <h1 className="font-display text-3xl mb-4">Courses</h1>
      <pre className="bg-secondary p-4 rounded-md border-2">{JSON.stringify(courses, null, 2)}</pre>
    </div>
  )
}
