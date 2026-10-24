'use client'
import { lireSalle } from "@/app/lib/action";
import ComponantSalle from "@/app/ui/salle/salle";
import { lireSalleJoueur, ajouterJoueurSalle } from '@/app/lib/action';
import { createClient } from '@/lib/supabase/client'
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export default function RechercherSalle() {
    const [codeSalle, setCodeSalle] = useState('')
    const [erreur, setErreur] = useState(false)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setErreur(false)
        setMessage('')
        setLoading(true)
        let estJoueurDejaDansSalle = false
        let joueurs = null
        let messageErreur: string | null = null
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (user == null) redirect('/compte/connexion')

        const salle = await lireSalle(codeSalle.trim().toUpperCase())
        if (salle == null || salle?.length == 0) {

            
            messageErreur = "Cette salle n'existe pas ou ou n'existe plus."
        }
        else {
            joueurs = await lireSalleJoueur(salle[0].id)

            if (joueurs !== null) {
                for (let i = 0; i < joueurs?.length; i++) {
                    if (joueurs[i].id_joueur == user.id) {
                        estJoueurDejaDansSalle = true

                    }

                }
            }
            if (joueurs !== null && salle !== null && salle[0].en_cours_de_Jeu) {
               
                messageErreur = "Cette salle est déjà en train de répondre à un quiz."
            }
            else if (joueurs !== null && salle !== null && joueurs?.length >= salle[0].nbr_joueur_max && !estJoueurDejaDansSalle) {
              
                messageErreur = "Cette salle est déjà pleine."
            }




        }
        setLoading(false)
        if (messageErreur) {
            setErreur(true)
            setMessage(messageErreur)
            return
        }


        router.push("salle/" + codeSalle.trim().toUpperCase())


    }





    return (
        <div className="flex flex-col flex-1 items-center justify-center align-middle ">
            <form onSubmit={handleSubmit} className='flex w-80 flex-1 flex-col gap-2 py-20 justify-center' noValidate>
                <h1 className="text-3xl font-bold text-center mb-30">Rechercher une salle</h1>
                <Label className='text-lg font-bold' htmlFor="CodeSalle">Code salle</Label>
                <Input aria-invalid={erreur} id="CodeSalle" className=' rounded-lg border p-2' placeholder="ABC123" value={codeSalle} onChange={(e) => setCodeSalle(e.target.value)} required />


                {message && <p className="text-sm text-red-600">{message}</p>}
                <Button disabled={loading} className=' mt-10 rounded-lg bg-primary text-secondary border text-2xl h-12  ' type="submit">{loading ? (
                    <span className="inline-flex items-center gap-1 ">
                        Recherche
                        <span className='animate-bounce [animation-delay:-0.3s]'>
                            .
                        </span>


                        <span className='animate-bounce [animation-delay:-0.15s]'>
                            .
                        </span>
                        <span className='animate-bounce'>
                            .
                        </span>
                    </span>
                ) : "Rechercher"}</Button>



            </form>


       


        </div >
    )
}

