import { redirect } from "next/navigation"
import { BrainCircuit } from "lucide-react"
import { Card } from "@/components/ui/card"
import { getUser } from "@/lib/get-user"
import { supabaseServer } from "@/lib/supabase-server"
import PracticeCard from "@/components/practice-card"

export default async function PracticePage() {
  const user = await getUser()
  if (!user) redirect("/auth")

  const supabase = supabaseServer()
  const { data: practiceSets } = await supabase
    .from("practice_sets")
    .select(`
      *,
      practice_questions(count)
    `)
    .eq("user_id", user.id)

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tighter sm:text-4xl">Practice Drills</h1>
      </div>

      {practiceSets && practiceSets.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {practiceSets.map((pack) => (
            <PracticeCard key={pack.id} pack={pack} />
          ))}
        </div>
      ) : (
        <Card className="mt-16 border-2 border-dashed border-border rounded-lg p-12 bg-transparent">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="p-4 bg-secondary rounded-full border-2 border-border mb-4">
              <BrainCircuit className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">No drills yet.</h2>
            <p className="mt-2 text-muted-foreground text-balance max-w-md">
              Finish a study session to auto-generate your first set of practice questions.
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
