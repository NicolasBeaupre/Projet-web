import { Metadata } from 'next';
import CreationCompte from '@/app/ui/compte/creation';
import { redirect } from "next/navigation";
import { createClient } from '@/lib/supabase/server'
export const metadata: Metadata = {
  title: "Création d'un compte",
};
export default async function PageCreationCompte() {
    const supabase = await createClient();
          const { data: { user } } = await supabase.auth.getUser()
      
          if (user) redirect("/compte/");
    return (
        
        <CreationCompte></CreationCompte>


    )
}