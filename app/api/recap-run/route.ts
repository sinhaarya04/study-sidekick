import { type NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function GET(req: NextRequest) {
  const supabase = supabaseServer()

  // Find users who studied today
  const today = new Date().toISOString().split("T")[0]
  const { data: sessions } = await supabase
    .from("sessions")
    .select("*, courses(title), profiles(full_name)")
    .gte("started_at", today)

  if (!sessions?.length) {
    return NextResponse.json({ message: "No sessions today" })
  }

  // Group by user and create daily summaries
  const userSessions = sessions.reduce(
    (acc, session) => {
      if (!acc[session.user_id]) acc[session.user_id] = []
      acc[session.user_id].push(session)
      return acc
    },
    {} as Record<string, any[]>,
  )

  for (const [userId, userSessionList] of Object.entries(userSessions)) {
    const totalMinutes = userSessionList.reduce((sum, s) => sum + (s.minutes || 0), 0)
    const coursesStudied = [...new Set(userSessionList.map((s) => s.course_id))]

    await supabase.from("daily_summaries").upsert({
      user_id: userId,
      date: today,
      minutes_today: totalMinutes,
      lectures_touched: coursesStudied,
      flashcards_created: 0, // Calculate from flashcards table
      summary_md: `Great work today! You studied for ${totalMinutes} minutes across ${coursesStudied.length} course(s).`,
    })
  }

  return NextResponse.json({ processed: Object.keys(userSessions).length })
}
