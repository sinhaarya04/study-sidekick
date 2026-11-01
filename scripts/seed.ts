import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function seed() {
  console.log("🌱 Seeding database...")

  // Create a test user (you'd normally do this through auth)
  const testUserId = "00000000-0000-0000-0000-000000000000"

  // Insert test course
  const { data: course } = await supabase
    .from("courses")
    .insert({
      user_id: testUserId,
      title: "Introduction to Machine Learning",
      source_url: "https://www.youtube.com/playlist?list=PLrAXtmrdJttub-r6FzSVeNag0j3fkYlBQ",
      status: "ready",
    })
    .select()
    .single()

  if (!course) {
    console.error("Failed to create course")
    return
  }

  // Insert test lectures
  const lectures = [
    { title: "What is Machine Learning?", duration_sec: 1800 },
    { title: "Supervised Learning", duration_sec: 2400 },
    { title: "Unsupervised Learning", duration_sec: 2100 },
  ]

  for (let i = 0; i < lectures.length; i++) {
    await supabase.from("lectures").insert({
      course_id: course.id,
      idx: i + 1,
      ...lectures[i],
      status: "processed",
    })
  }

  // Insert test practice set
  await supabase.from("practice_sets").insert({
    user_id: testUserId,
    course_id: course.id,
    title: "ML Fundamentals",
    topic_tags: ["machine-learning", "basics"],
    total_questions: 5,
  })

  console.log("✅ Database seeded successfully!")
}

seed().catch(console.error)
