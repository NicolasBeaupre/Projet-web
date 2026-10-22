'use client'
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Code } from 'lucide-react'
import { VraiSalle, SalleJoueur } from '@/app/lib/definitions'
import type { User } from '@supabase/supabase-js'
import { lireSalle, lireSalleJoueur, supprimerJoueurSalle, supprimerSalle } from '@/app/lib/action'
import { CopieLien } from './copy-clipboard-btn'
import { usePathname, useSearchParams } from 'next/navigation'
export default function ComponantSalle({ pSalle, joueursInitiaux, user }: { pSalle: VraiSalle, joueursInitiaux: SalleJoueur[], user: User }) {
    const [salle, setSalle] = useState(pSalle)
    const [joueurs, setJoueurs] = useState(joueursInitiaux)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const url = `${pathname}${searchParams.toString()}`
    useEffect(() => {
        const supabase = createClient()

        const refetch = async () => {
            let dataJoueurs = await lireSalleJoueur(pSalle.id)
            setJoueurs(dataJoueurs ?? [])
            let estToujoursDansSalle = false
            if (dataJoueurs == null) dataJoueurs = []
            dataJoueurs.forEach(j => {
                if (j.id_joueur === user.id) estToujoursDansSalle = true
            });
            if (!estToujoursDansSalle) router.push('/')
        }


        const channel = supabase.channel('salle:' + pSalle.id).on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'salle_joueur', filter: 'id_salle=eq.' + pSalle.id },
            refetch
        ).on(
            'postgres_changes',
            { event: 'DELETE', schema: 'public', table: 'salle_joueur' },
            refetch
        ).subscribe((status) => {
            if (status === 'SUBSCRIBED') refetch()
        })
        return () => {
            supabase.removeChannel(channel)
        }
    }, [pSalle.id])



    async function QuitterSalle() {

        supprimerJoueurSalle(user.id, pSalle.id)
        router.push('/')
        router.refresh()
    }
    async function SupprimerSalle() {
        supprimerSalle(user.id, pSalle.id)
        router.push('/')
        router.refresh()
    }


    return (

        <div>
            <h1 className='text-2xl font-bold '>{pSalle.nom_salle}</h1>
            <div className='border-2 rounded-xl p-3'>
                <h2 className='text-lg font-bold'>Joueurs dans la salle</h2>
                <hr />
                {joueurs.map((joueurs) =>
                (
                    <div key={joueurs.id_joueur}>{joueurs.nom_joueur}</div>
                ))}

            </div>
            <p>{joueurs.length}/{pSalle.nbr_joueur_max} Joueur connectées</p>

            {user.id !== pSalle.createur_salle && <Button onClick={() => { QuitterSalle() }}>Quitter</Button>}
            {user.id == pSalle.createur_salle && <Button onClick={() => { SupprimerSalle() }}>Supprimer</Button>}
            <CopieLien lien={"http://localhost:3000" + pathname}></CopieLien>
            {/* <CopieLien lien={`http://localhost:3000/jeu/salle/${pSalle.code}`}></CopieLien> */}
        </div>


    )
}
