
import { createClient } from '@/lib/supabase/server'

import { redirect } from "next/navigation";
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
                    
                </div>
                <p>Date de création du compte : {user.created_at}</p>
                <p>Dernière connexion du compte : {user.last_sign_in_at}</p>
                <div>
 
                </div>


            </div>
        </div>


    )
}