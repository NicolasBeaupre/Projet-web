"use client"
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignUpPage() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [passwordErreur, setPasswordErreur] = useState(false)


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        setMessage('')
        setUsernameError(false)
        setPasswordErreur(false)

        setUsernameErrorMessage('')
        const supabase = createClient()

        if (password !== password2) {
            setMessage("Les mots de passe doivent correspondre.")
            setPasswordErreur(true)
            return
        }
        if (password.length < 6) {
            console.log(password.length)
            setMessage("Le mot de passe doit faire au minimum 6 caractères.")
            setPasswordErreur(true)
            return
        }

        if (username.length < 3) {
            setUsernameError(true)
            setUsernameErrorMessage("Le nom d'utilisateur doit faire au minimum 3 caractères.")
            return
        } if (username.length > 20) {
            setUsernameError(true)
            setUsernameErrorMessage("Le nom d'utilisateur doit faire au maximum 20 caractères.")
            return
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            setUsernameError(true)
            setUsernameErrorMessage("Le nom d'utilisateur ne peut contenir que des lettres, chiffres ou _.")
            return
        }


        setLoading(true)
        const { error } = await supabase.auth.signUp({
            email: `${username.toLowerCase()}@quiztro.local`,     
                 
            password,
            options: { data: { username: username.trim(), locale: 'fr' } },
        })
        setLoading(false)


        if (error) {
            if (error.message.includes('already registered')) {
                setUsernameError(true)
                setUsernameErrorMessage("Ce nom d'utilisateur est déjà pris.")
            }
            else {

                setMessage(error.message)
            }
            return
        }


        sessionStorage.setItem('messageFlash', 'compteCree')
        router.push('/compte/connexion')

    }



    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <h1 className='text-3xl font-bold '>Création d'un compte</h1>

            <form onSubmit={handleSubmit} className='flex flex-col w-80 gap-2 py-20'>

                <input aria-invalid={usernameError} className={` p-2 rounded-lg border  ${usernameError ? 'border-red-600' : ''}`} placeholder="Nom d'utilisateur" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                {usernameErrorMessage && <p className="text-sm text-red-600">{usernameErrorMessage}</p>}

                <input className={` p-2 rounded-lg border  ${passwordErreur ? 'border-red-600' : ''}`} placeholder='Mot de passe' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input className={` p-2 rounded-lg border  ${passwordErreur ? 'border-red-600' : ''}`} placeholder='Validation du mot de passe' type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
                {message && <p className="text-sm text-red-600">{message}</p>}
                <button disabled={loading} className='rounded-lg bg-primary text-secondary border p-2' type="submit">{loading ? 'Création...' : "S'inscrire"}</button>
                
                <Button  variant="link" render={<Link href="/compte/connexion" />} nativeButton={false}>Déjà un compte?</Button>

            </form>
        </div>



    )
}