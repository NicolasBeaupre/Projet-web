
import { createClient } from '@/lib/supabase/server'

import { redirect } from "next/navigation";
import Link from "next/link"
import { Button } from "@/components/ui/button"


export default async function SignUpPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect("/compte/connexion");



    return (

        <div className='flex justify-center'>
            <div className="container flex justify-center py-10">
                <h1 className="text-2xl">Votre compte</h1>
                
            
            </div>
        </div>


    )
}