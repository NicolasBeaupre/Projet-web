
import { lireSalle } from "@/app/lib/action";
import ComponantSalle from "@/app/ui/salle/salle";
import { lireSalleJoueur, ajouterJoueurSalle } from '@/app/lib/action';
import { createClient } from '@/lib/supabase/server'
import { redirect } from "next/navigation";

export default async function Page(props: PageProps<'/salle/[codeSalle]'>) {
    const { codeSalle } = await props.params
    let joueurs = null
    let salleExiste = true
    let sallePleine = false
    let estJoueurDejaDansSalle = false

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user == null) redirect('/compte/connexion')
        
    const salle = await lireSalle(codeSalle)
    if (salle == null || salle?.length == 0) {
        salleExiste = false
    }
    else {
        joueurs = await lireSalleJoueur(salle[0].id)

        if (joueurs !== null) {
            for (let i = 0; i < joueurs?.length; i++) {
                 if(joueurs[i].id_joueur == user.id){
                    estJoueurDejaDansSalle = true
                 }

            }
        }

        if (joueurs !== null && salle !== null && joueurs?.length >= salle[0].nbr_joueur_max && !estJoueurDejaDansSalle) {
            sallePleine = true
        }
        else {

            ajouterJoueurSalle({ id_salle: salle[0].id, id_joueur: user?.id, nom_joueur: user?.user_metadata?.username })

        }

    }



    return (
        <div className="flex-1 flex">

            {salleExiste && !sallePleine &&


                <ComponantSalle pSalle={salle[0]} joueursInitiaux={joueurs ?? []}
                    user={user ?? null} />
            }
            {salleExiste && sallePleine &&
                <div className="flex flex-col flex-1 items-center align-middle  justify-center">
                    <div className="flex flex-col h-full justify-center items-center">
                        <div className="flex-col flex">
                            <h1 className="text-2xl font-bold">Oups...</h1>
                            <p>Cette salle est déjà pleine.</p>
                        </div>
                    </div>
                </div>
            }
            {!salleExiste &&
                <div className="flex flex-col flex-1  items-center align-middle  justify-center">


                    <div className="flex-col flex">
                        <h1 className="text-2xl font-bold">Oups...</h1>
                        <p>Cette salle n'existe pas ou ou n'existe plus.</p>
                    </div>


                </div>
            }


        </div >
    )
}

