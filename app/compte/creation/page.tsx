"use client"
import { createClient } from '@/lib/supabase/client'
import { useState } from "react";

export default function SignUpPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(false)

        const supabase = createClient()
        if (password == password2) {

            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/confirm`,
                },
            })

            setLoading(false)
            if (error) setMessage(error.message)
            else setDone(true)
        }
        else {
            setMessage("Les mots de passe doivent correspondre.")
        }
    }

    if (done) {
        return <p>Vérifiez votre boîte mail pour confirmer votre inscription.</p>
    }

    return (
        <div  className="flex flex-col  items-center justify-center bg-zinc-50 font-sans dark:bg-black">

            <form onSubmit={handleSubmit}  className='flex flex-col gap-2 py-20'>

                <input className=' rounded-lg border p-2' placeholder='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className='rounded-lg border p-2' placeholder='Mot de passe' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input className='rounded-lg border p-2' placeholder='Validation du mot de passe' type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
                {message && <p className="text-sm text-red-600">{message}</p>}
                <button disabled={loading} className='rounded-lg bg-primary text-secondary border p-2' type="submit">{loading ? 'Création...' : "S'inscrire"}</button>

            </form>
        </div>



    )
}