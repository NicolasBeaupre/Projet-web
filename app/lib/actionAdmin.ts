"use server"
import { createAdminClient } from '@/lib/supabase/admin';

export async function lireUtilisateurNomAdmin(id: string) {
    const supabase = await createAdminClient();

    const { data, error } = await supabase.auth.admin.getUserById(id);
    if (error) return null;

    return data.user.user_metadata?.username ?? null;

}

