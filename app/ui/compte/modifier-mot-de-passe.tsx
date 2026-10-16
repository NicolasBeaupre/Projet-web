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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from "react"
import { redirect, useRouter } from "next/navigation"
import { CheckCircle2Icon } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export function DialogModifierMotDePasse({ user }: { user: User | null }) {
    const router = useRouter()

    useEffect(() => {
        if (!user || user == null) router.push("/compte/connexion")

    }, [user, router])

    const [message, setMessage] = useState('')
    const [motDePasse01, setMotDePasse01] = useState('')
    const [motDePass02, setMotDePasse02] = useState('')
    const [motDePasseErreur, setMotDePasseErreur] = useState(false)
    const [ouvert, setOuvert] = useState(false)
    const [loading, setLoading] = useState(false)
    const [montrerFlash, setMontrerFlash] = useState(false)

    async function FermetureDialog(estOuvert: boolean) {
        setOuvert(estOuvert)
        if (!estOuvert) {

            setMessage('')
            setMotDePasseErreur(false)
        }
    }


    async function handleSubmit(e: React.FormEvent) {
        
        e.preventDefault()
        setMessage('')
        setMotDePasseErreur(false)
        const supabase = createClient()

        if (motDePasse01 !== motDePass02) {
            setMessage("Les mots de passe doivent correspondre.")
            setMotDePasseErreur(true)
            return
        }
        if (motDePasse01.length < 6) {
            
            setMessage("Le mot de passe doit faire au minimum 6 caractères.")
            setMotDePasseErreur(true)
            return
        }
        setLoading(true)
        const { error } = await supabase.auth.updateUser({
            password: motDePasse01,
        })
        setLoading(false)
        if (error) {
            if (error.message.includes('New password should be different from the old password.')) {
                setMotDePasseErreur(true)
                setMessage("Le nouveau mot de passe doit être différent du mot de passe précédent.")
                return
            }
            else {
                setMessage(error.message)
                return
            }
        }
        else {
            setOuvert(false)
            setMontrerFlash(true)

            setTimeout(() => {
                setMontrerFlash(false)
            }, 10000);
        }


    }
    return (
        <div className="flex justify-center">
            <div className='mt-5  fixed top-20 flex items-center justify-center w-[80vw]'>
                {montrerFlash && (

                    < Alert className="max-w-md  bg-emerald-100 border-emerald-600" >
                        <CheckCircle2Icon />
                        <AlertTitle>Mot de passe modifier avec succès</AlertTitle>
                        <AlertDescription>
                            Votre mot de passe à été modifier avec succès.
                        </AlertDescription>
                    </Alert >

                )}
            </div>
            <Dialog open={ouvert} onOpenChange={FermetureDialog} >
                {/* <form> */}
                <DialogTrigger render={<Button  className="h-8 text-lg "> Changer le mot de passe</Button>} />
                <DialogContent className="sm:max-w-sm">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Modifier le mot de passe</DialogTitle>
                            <DialogDescription>
                                Votre ancien mot de passe ne sera pas conservé. Ne divulgez pas votre mot de passe.
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup className="my-4">
                            <Field>
                                <FieldLabel htmlFor="motDePasse01" className="hidden">Mot de passe</FieldLabel>
                                <Input aria-invalid={motDePasseErreur} type="password" placeholder='Mot de passe' onChange={(e) => setMotDePasse01(e.target.value)} id="motDePasse01" name="motDePasse01" />
                            </Field>
                            <Field >
                                <FieldLabel htmlFor="motDePasse02" className="hidden">Validation du mot de passe</FieldLabel>
                                <Input aria-invalid={motDePasseErreur} type="password" onChange={(e) => setMotDePasse02(e.target.value)} placeholder='Validation du mot de passe' id="motDePasse02" name="motDePasse02" />
                            </Field>

                        </FieldGroup>
                        {message && <p className="text-sm text-red-600">{message}</p>}
                        <DialogFooter>
                            <DialogClose render={<Button onClick={(e) => setMessage('')} variant="outline">Annuler</Button>} />
                            <Button type="submit" variant={"destructive"} className="btn ">{loading ? 'Sauvegarde...' : "Modifier"}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}