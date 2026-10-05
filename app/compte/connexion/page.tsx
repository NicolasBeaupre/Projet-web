'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from "react";
import { AlertBasic } from '@/app/ui/compte/alert-creation-compte'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
import { refresh } from 'next/cache'
export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const [montrerFlash, setMontrerFlash] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('messageFlash') === 'compteCree') {

      setMontrerFlash(true)
      sessionStorage.removeItem('messageFlash')

    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(false)
    const supabase = createClient()
    
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({

      email: `${username.toLowerCase()}@quiztro.local`,
      password: password
    }

    )
    setLoading(false)
    if (error) {
      console.log(error.message)
      if (error.message == "Invalid login credentials")
        setMessage("La combinaison nom d'utilisateur, mot de passe n'existe pas.")
        // setMessage(error.message)
        

      return
    }
    router.push('/')
    router.refresh()

  }


  return (



    <div className="flex flex-col flex-1 items-center align-middle  justify-center bg-zinc-50 font-sans dark:bg-black">
      {montrerFlash && (
        <div className='mt-5  fixed top-20 flex items-center justify-center w-[80vw]'>


          <AlertBasic></AlertBasic>


        </div>
      )}
      <h1 className='text-3xl font-bold pt-45'>Connexion</h1>

      <form onSubmit={handleSubmit} className='flex w-80 flex-1 flex-col gap-2 py-20' noValidate>

        <input className=' rounded-lg border p-2' placeholder="nom d'utilisateur" type="email" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input className='rounded-lg border p-2' placeholder='Mot de passe' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        {message && <p className="text-sm text-red-600">{message}</p>}
        <button disabled={loading} className='rounded-lg bg-primary text-secondary border p-2' type="submit">{loading ? 'Connexion...' : "Se connecter"}</button>

        <Button variant="link" render={<Link href="/compte/creation" />} nativeButton={false}>Créer un compte</Button>

      </form>
    </div>



  )
}