import { supabaseServer } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { courseId, notes } = await req.json()
  const supabase = supabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // Stub flashcards - in production, call OpenAI to generate these
  const flashcards = [
    {
      question: "What is machine learning?",
      answer: "A subset of AI that enables computers to learn without being explicitly programmed.",
      tags: ["basics", "definition"],
    },
    {
      question: "What are the main types of machine learning?",
      answer: "Supervised, unsupervised, and reinforcement learning.",
      tags: ["types", "classification"],
    },
  ]

  const { error } = await supabase.from("flashcards").insert(
    flashcards.map((fc) => ({
      ...fc,
      user_id: user.id,
      course_id: courseId,
      next_review: new Date().toISOString().split("T")[0],
    })),
  )

  if (error) return NextResponse.json({ error }, { status: 500 })

  return NextResponse.json({ count: flashcards.length })
}
