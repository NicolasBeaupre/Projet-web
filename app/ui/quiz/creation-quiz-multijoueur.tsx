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
import CreerSalle from '@/app/jeu/multijoueur/action'
import { Code } from 'lucide-react'
type Salle = {
    idCreateur?: string,
    nomLobby: string,
    nbrJoueurMax: string
}
export default function ComponentsCreationQuizMultijoueur() {

    const router = useRouter()

    const [nbrJoueur, setNbrJoueur] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [erreurNbrJoueur, setErreurNbrJoueur] = useState(false)
    const [nomLobby, setNomLobby] = useState("")
    const [erreurNomLobby, setErreurNomLobby] = useState(false)
    const [messageErreurNomLobby, setMessageErreurNomLobby] = useState('')
    const nbrJoueurSelect = [

        { label: "2", value: '2' },
        { label: "3", value: '3' },
        { label: "4", value: '4' },
        { label: "5", value: '5' },
    ]
    useEffect(() => {
        setMessage('')
        setErreurNbrJoueur(false)
    }, [nbrJoueur])
    useEffect(() => {
        setMessageErreurNomLobby('')
        setErreurNomLobby(false)
    }, [nomLobby])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        console.log(nbrJoueur)
        setMessage('')
        setErreurNbrJoueur(false)
        setErreurNomLobby(false)
        setLoading(false)
        if (!nbrJoueur) {
            setMessage("Veuillez entrer un nombre de joueur.")
            setErreurNbrJoueur(true)

            return
        }
        if (nomLobby.trim() == '') {
            setMessageErreurNomLobby("Veuillez entrer le nom de la salle.")
            setErreurNomLobby(true)

            return
        }
        setLoading(true)
        const data: Salle =
        {
            // idCreateur: user?.id,
            idCreateur: user?.id,
            nomLobby: nomLobby,
            nbrJoueurMax: nbrJoueur
        }

        const result = await CreerSalle(data)
        if (result === "Creer") {
            setLoading(false)
            router.push('/')
        }
        else {
            setLoading(false)
            setMessage(result)
        }



        // console.log(data)
    }

    return (

        <div className=" flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans  dark:bg-black">

            <h1 className='text-3xl mb-10 font-bold '>Création d'un lobby multijoueur</h1>
            <div className=' flex flex-col gap-10  p-5 border-2 rounded-2xl'>

                <form onSubmit={handleSubmit} className='flex flex-col w-80 gap-2 py-10 ' noValidate>
                    <fieldset className='w-full flex flex-col gap-10'>
                        <Field>
                            <FieldLabel className='text-lg font-bold' htmlFor='nom-salle-multi-input'>Nom de la salle</FieldLabel>
                            <Input id='nom-salle-multi-input' aria-invalid={erreurNomLobby} className={` p-2 rounded-lg border  ${erreurNomLobby ? 'border-red-600' : ''}`} placeholder="Nom de la salle multijoueur" type="text" value={nomLobby} onChange={(e) => setNomLobby(e.target.value)} required ></Input>

                            {messageErreurNomLobby && <p className="text-sm text-red-600">{messageErreurNomLobby}</p>}
                        </Field>
                        <Field >
                            <FieldLabel className='text-lg font-bold' htmlFor='nbr-joueur-lobby-select'>Nombre de joueurs</FieldLabel>

                            <Select value={nbrJoueur} onValueChange={setNbrJoueur} >
                                <SelectTrigger id="nbr-joueur-lobby-select" aria-invalid={erreurNbrJoueur} >
                                    <SelectValue placeholder="Nombre de joueurs" />
                                </SelectTrigger>
                                <SelectContent >
                                    <SelectGroup>
                                        {nbrJoueurSelect.map((item) => (
                                            <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {message && <p className="text-sm text-red-600">{message}</p>}
                        </Field>

                    </fieldset>




                    <Button disabled={loading} className=' mt-10 rounded-lg bg-primary text-secondary border text-2xl h-12  ' type="submit">{loading ? (
                        <span className="inline-flex items-center gap-1 ">
                            Création
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
                    ) : "Créer"}</Button>



                </form>
            </div>
        </div>

    )
}
