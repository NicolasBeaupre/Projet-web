'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'



export default function AuthEcoute({ userId }: { userId: string | null }) {
    // Sert à mettre à jours le layout lors ce que l'utilisateur se deconnecte.
    // Cela permet d'éviter que 
    const router = useRouter()

    useEffect(() => {
        const supabase = createClient()

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            const clientUserId = session?.user?.id ?? null

            if (event === 'SIGNED_OUT' || event === 'SIGNED_IN') {          
                if (clientUserId !== userId) {
                    router.refresh()
                }        
            }
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [router]) // le tableau contient les dépendances du useEffect. Un peut comme un paramêtre, mais dès que router change de valeur useEffect est appellé. Si il n'y aurait pas de tableau usestate serait appelé après chaque rendu du composant.

    return null
}

