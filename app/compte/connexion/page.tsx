
import Connexion from '@/app/ui/compte/connexion';
import { Metadata } from 'next';

import { redirect } from "next/navigation";
import { createClient } from '@/lib/supabase/server'
export const metadata: Metadata = {
  title: 'Connexion',
};
export default async  function PageConnexion() {
  const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser()

      if (user) redirect("/compte/");

  return (
    <Connexion></Connexion>
  )
}