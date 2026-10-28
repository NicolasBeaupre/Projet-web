'use server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache'
export async function supprimerCompte() {
    const supabase = await createAdminClient();
    const supabaseServer = await createClient()
    //  const { data: { user } } = await supabase.auth.getUser()
    const { data: { user } } = await supabaseServer.auth.getUser()
    if (user == null) throw new Error("Vous devez être connecté pour supprimer un compte.")
    if (user !== null) {
        const { data, error } = await supabase.auth.admin.deleteUser(
            user.id
        )
        if (error) throw new Error(error.message)
    }
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/compte/connexion')

}