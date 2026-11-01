import { supabaseServer } from "./supabase-server"

export async function getUser() {
  const supabase = supabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}
