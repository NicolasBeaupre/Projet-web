
import { createClient } from '@/lib/supabase/server'

import { redirect } from "next/navigation";
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function SignUpPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect("/compte/connexion");
    const dateCreation = new Date(user.created_at).toLocaleDateString('fr-FR', {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const dateDerniereConnexion = user.last_sign_in_at ?
        new Date(user.last_sign_in_at).toLocaleDateString('fr-FR', {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }) : "";


    return (
        <div className=" flex justify-center">
            <div className=" container flex flex-col gap-10 my-55 justify-center text-center align-middle">
                <h1 className="text-2xl font-bold ">Mon compte</h1>
                <div className='container flex flex-col gap-10 justify-center text-center align-middle'>

                    <div className='flex justify-center'>
                        <p>Nom d'utilisateur : {user.user_metadata.username}</p>

                    </div>
                    <p>Date de création du compte : {dateCreation}</p>
                    <p>Dernière connexion du compte : {dateDerniereConnexion}</p>
                    <div>

                    </div>
                </div>


            </div>
        </div>


    )
}