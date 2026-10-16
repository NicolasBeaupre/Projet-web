
import { createClient } from '@/lib/supabase/server'

import { redirect } from "next/navigation";

import { DialogModifierMotDePasse } from '../ui/compte/modifier-mot-de-passe';

export default async function Compte() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect("/compte/connexion");
    const dateCreation = new Date(user.created_at).toLocaleDateString('fr-FR', {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const dateDerniereConnexion = user.last_sign_in_at ?
        new Date(user.last_sign_in_at).toLocaleDateString('fr-FR', {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }) : "";


    return (
        <div className=" flex justify-center ">

            <div className=" container   flex flex-col gap-10 my-25 justify-center text-center align-middle">
                <h1 className="text-2xl font-bold ">Mon compte</h1>
                <div className='  flex justify-center '>

                    <div className=' flex flex-col gap-10 m-2 p-5 border-2 rounded-2xl'>

                        <div className='flex justify-between'>
                            <p className='text-lg'>Nom d'utilisateur :  </p>
                            <p className='text-lg'> {user.user_metadata.username}</p>

                        </div>
                        <hr></hr>

                        <div className='flex justify-between'>

                            <p>Date de création du compte : </p>
                            <p className='text-lg'>{dateCreation}</p>
                        </div>
                        <hr></hr>

                        <div className='flex justify-between'>

                            <p>Dernière connexion du compte : </p>
                            <p className='text-lg'>{dateDerniereConnexion}</p>
                        </div>
                        <hr></hr>
                        <div>
                            <DialogModifierMotDePasse user={user}></DialogModifierMotDePasse>
                        </div>
                    </div>
                </div>


            </div>
        </div>


    )
}