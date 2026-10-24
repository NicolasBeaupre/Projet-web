
import { lireSalle } from "@/app/lib/action";
import ComponantSalle from "@/app/ui/salle/salle";
import { lireSalleJoueur, ajouterJoueurSalle } from '@/app/lib/action';
import { createClient } from '@/lib/supabase/server'
import { redirect } from "next/navigation";
import RechercherSalle from "../ui/salle/recherche-salle";
export default async function Page() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (user == null) redirect('/compte/connexion')




    return (
        <RechercherSalle />
    )
}

