'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { useState } from "react"

export function DialogModificationUsername({ user }: { user: User }) {
    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [message, setMessage] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        console.log('bob')
        e.preventDefault()
        setMessage('')
        setUsernameError(false)
        const supabase = createClient()
        const { error } = await supabase.auth.updateUser({
            email: `${username.toLowerCase()}@quiztro.local`,
            data: { username: username.trim() }
        })

        if (error) {
            // if (error.message.includes('already registered')) {
            //     setUsernameError(true)
            //     setUsername("Ce nom d'utilisateur est déjà pris.")
            // }
            // else {
            console.log(error.message)
            setMessage(error.message)
            // }
            return
        }


    }
    return (
        <Dialog>
            <form onSubmit={handleSubmit}>
            {/* <form> */}
                <DialogTrigger render={<Button variant="outline">Midifier</Button>} />
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Modifier le nom du profil</DialogTitle>
                        <DialogDescription>
                            Changer votre nom d'utilisateur ici. Ne divulgez pas d'information personnelle dans votre nom de profil
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <label htmlFor="username-1">Nom utilisateur</label>
                            <input onChange={(e) => setUsername(e.target.value)} id="username-1" name="username" defaultValue={user.user_metadata.username} />
                        </Field>
                    </FieldGroup>
                    {message && <p className="text-sm text-red-600">{message} cdcwsdcdd</p>}
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Annuler</Button>} />
                        <button type="submit" className="btn ">Sauvegarder</button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
