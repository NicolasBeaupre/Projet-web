"use server"
import { createAdminClient } from '@/lib/supabase/admin';

export async function lireUtilisateurNomAdmin(id: string) {
    const supabase = await createAdminClient();

    const { data, error } = await supabase.auth.admin.getUserById(id);
    if (error) return null;

    return data.user.user_metadata?.username ?? null;

}



export async function lireUtilisateurAdmin(id: string) {
    try{

        const supabase = await createAdminClient();
        
        const { data, error } = await supabase.auth.admin.getUserById(id);
        if (error || !data.user) return null;
        if (data.user == null) return null
        return { userName : data.user.user_metadata?.username ?? null, dateCreation: data.user.created_at, derniereConnexion:  data.user.last_sign_in_at  }
    }catch{
        return null
    }

}


