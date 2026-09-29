'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(false)

    const supabase = createClient()


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

  if (done) {
    return (
      <div className="flex flex-col  items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <p>Vérifiez votre boîte mail pour confirmer votre inscription.</p>
      </div>
    )
  }

  return (

    <div className="flex flex-col flex-1 items-center align-middle  justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className='text-3xl font-bold pt-45'>Connexion</h1>

      <form onSubmit={handleSubmit} className='flex flex-1 flex-col gap-2 py-20'>

        <input className=' rounded-lg border p-2' placeholder='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className='rounded-lg border p-2' placeholder='Mot de passe' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        {message && <p className="text-sm text-red-600">{message}</p>}
        <button disabled={loading} className='rounded-lg bg-primary text-secondary border p-2' type="submit">{loading ? 'Création...' : "S'inscrire"}</button>
        <a href="/compte/creation">Créez un compte</a>

      </form>
    </div>



  )
}