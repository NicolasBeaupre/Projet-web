"use server"
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
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
        return { userName : data.user.user_metadata?.username ?? null, dateCreation: data.user.created_at, derniereConnexion:  data.user.last_sign_in_at, est_admin:data.user?.app_metadata?.est_admin  }
    }catch{
        return null
    }

}

export async function devenirAdmin(id_user: string){
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser()
    if (!user?.app_metadata?.est_admin) {
        throw new Error("Non autorisé")
    }
    const supabaseAdmin = await createAdminClient()
    const { error } = await supabaseAdmin.auth.admin.updateUserById(id_user, {
        app_metadata: { est_admin: true },
    })

    if (error) throw new Error(error.message)
}


