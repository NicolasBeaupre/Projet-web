// components/SignOutButton.tsx
'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function BtnDeconnexion() {
  const router = useRouter()
  const supabase = createClient()

  const Deconnexion = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Erreur deconnexion', error.message)
      return
    }
    router.push('/compte/connexion')
    router.refresh()
  }

  return <button onClick={Deconnexion}>Déconnexion</button>
}