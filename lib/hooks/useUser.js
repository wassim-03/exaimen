import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useUser() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    // On mount, fetch current session
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null))
    return () => subscription.unsubscribe()
  }, [])
  return user
}