import { type NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function POST(req: NextRequest) {
  const { courseId, question, topK = 6 } = await req.json()
  const supabase = supabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // 1. In production: embed question using OpenAI
  // const embedding = await openai.embeddings.create({...})

  // 2. For now, return a stub response
  // const { data: matches } = await supabase.rpc('match_chunks', {
  //   query_embedding: embedding.data[0].embedding,
  //   match_count: topK,
  //   course_id: courseId
  // })

  // 3. Feed to LLM for answer generation
  const answer =
    "Based on the course material, machine learning is a method of data analysis that automates analytical model building. It's a branch of artificial intelligence based on the idea that systems can learn from data, identify patterns and make decisions with minimal human intervention."

  return NextResponse.json({
    answer,
    citations: [{ content: "Machine learning definition from lecture 1", lecture: "Introduction" }],
  })
}
