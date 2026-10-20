'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from "react";
import { AlertBasic } from '@/app/ui/compte/alert-creation-compte'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
import { refresh } from 'next/cache'


export default function Connexion() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)
    

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(false)
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user !== null){
            console.log("null")
        }
        setLoading(true)

        const { error } = await supabase.auth.signInAnonymously({
            options: { data: { username: username.trim(), locale: 'fr' } },
        }

        )
        setLoading(false)
        if (error) {
            setMessage(error.message)
            return
        }

        router.push('/quiz/multijoueur')
        router.refresh()

    }


    return (



        <div className="flex flex-col flex-1 items-center align-middle  justify-center bg-zinc-50 font-sans dark:bg-black">

            <h1 className='text-3xl font-bold pt-45'>Connexion</h1>

            <form onSubmit={handleSubmit} className='flex w-80 flex-1 flex-col gap-2 py-20' noValidate>

                <input className=' rounded-lg border p-2' placeholder="nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} required />
                {message && <p className="text-sm text-red-600">{message}</p>}
                <Button disabled={loading} className='rounded-lg bg-primary text-secondary border p-2' type="submit">{loading ? 'Connexion...' : "Se connecter"}</Button>

                <Button variant="link" render={<Link href="/compte/connexion" />} nativeButton={false}>Vous avez déjà un compte?</Button>

            </form>
        </div>



    )
}