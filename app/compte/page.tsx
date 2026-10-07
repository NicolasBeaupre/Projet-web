
import { createClient } from '@/lib/supabase/server'

import { redirect } from "next/navigation";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DialogModificationUsername } from '../ui/compte/modifier-nom-utilisateur';

export default async function SignUpPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect("/compte/connexion");




    return (
        <div className=" flex justify-center">
            <div className=" container flex flex-col gap-10 py-55 justify-center text-center align-middle ">
                <h1 className="text-2xl font-bold">Votre compte</h1>

                <div className='flex justify-center'>
                    <p>Nom d'utilisateur : {user.user_metadata.username}</p>
                    <DialogModificationUsername user = {user} ></DialogModificationUsername>
                    {/* <Button className="ms-6" variant="secondary">Modifier</Button> */}
                </div>
                <p>Date de création du compte : {user.created_at}</p>
                <p>Dernière connexion du compte : {user.last_sign_in_at}</p>
                <div>
                    <Button className="ms-6">Modifier le mode de passe</Button>
                    <Button className="" variant="destructive"  >Suprimer le compte</Button>
                </div>


            </div>
        </div>


    )
}