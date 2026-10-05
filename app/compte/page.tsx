
import { createClient } from '@/lib/supabase/server'

import { redirect } from "next/navigation";
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function SignUpPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect("/erreur");



    return (
   
        <div>bob</div>


    )
}