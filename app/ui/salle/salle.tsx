'use client'
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
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
import { Copiecode } from './copy-clipboard-code'
import { usePathname, useSearchParams } from 'next/navigation'
export default function ComponantSalle({ pSalle, joueursInitiaux, user }: { pSalle: VraiSalle, joueursInitiaux: SalleJoueur[], user: User }) {
    const [salle, setSalle] = useState(pSalle)
    const [joueurs, setJoueurs] = useState(joueursInitiaux)
    const [url, setUrl] = useState('') // url pour le copier coller. Lien de la salle
    const router = useRouter()


    useEffect(() => {
        setUrl(window.location.href)
    }, [])


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

        <div className="flex flex-col flex-1 items-center align-middle  justify-end ">
            {/* <h1 className='text-3xl font-bold my-10'>Nom de la salle : {pSalle.nom_salle}</h1> */}
            <div className='text-2xl font-bold my-10  flex items-baseline mb-5'><p className=''>Nom de la salle :  </p> <p className='text-3xl ps-1'>  {pSalle.nom_salle}</p></div>
            <div className=' flex items-baseline font-bold mb-5 gap-2'>
                <p className='text-2xl font-bold '>code: </p>
                <Copiecode lien={pSalle.code}></Copiecode>
            </div>
            <CopieLien lien={url}></CopieLien>
            <div className='border-2 rounded-xl p-3 lg:w-2xl md:w-fit lg:h-60 md:h-fit my-10'>
                <div className='flex justify-between flex-wrap '>

                    <h2 className='text-lg font-bold'>Joueurs dans la salle</h2>
                    <div className='flex gap-2 items-baseline'><p className='text-2xl'>{joueurs.length}/{pSalle.nbr_joueur_max}</p> </div>
                </div>
                <hr />
                <div className='flex flex-wrap p-4 gap-10 justify-center items-center align-middle h-full'>

                    {joueurs.map((joueurs) =>
                    (

                        <div key={joueurs.id_joueur} className='justify-items-center'>
                            <div className="text-lg font-bold rounded-full flex flex-col justify-center text-center bg-secondary h-15 w-15" >
                                <p className='text-lg'>{joueurs.nom_joueur[0].toUpperCase()}</p>
                            </div>
                            <p className='text-lg font-bold'>{joueurs.nom_joueur}</p>
                        </div>
                    ))}
                </div>

            </div>


            {user.id !== pSalle.createur_salle && <Button className="w-40 h-15 text-lg" onClick={() => { QuitterSalle() }}>Quitter</Button>}
            {user.id == pSalle.createur_salle && <Button className="w-45 h-15 text-lg" variant={"destructive"} onClick={() => { SupprimerSalle() }}>Supprimer la salle</Button>}


        </div>


    )
}
