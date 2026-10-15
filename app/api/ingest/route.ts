import { type NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function POST(req: NextRequest) {
  const { url } = await req.json()
  const supabase = supabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // 1. Create course row
  const { data: course, error } = await supabase
    .from("courses")
    .insert({
      user_id: user.id,
      title: "Processing Course...",
      source_url: url,
      status: "ingesting",
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error }, { status: 500 })

  // 2. Kick off ingestion job (serverless/queue). For now stub.
  // In production, you'd trigger a background job here

  // Simulate processing stages
  setTimeout(async () => {
    await supabase
      .from("courses")
      .update({ status: "ready", title: "Introduction to Machine Learning" })
      .eq("id", course.id)
  }, 10000)

  return NextResponse.json({ courseId: course.id })
}
