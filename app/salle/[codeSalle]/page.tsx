
import { lireSalle } from "@/app/lib/action";
import ComponantSalle from "@/app/ui/salle/salle";
import { lireSalleJoueur, ajouterJoueurSalle } from '@/app/lib/action';
import { createClient } from '@/lib/supabase/server'
import { redirect } from "next/navigation";
export default async function Page(props: PageProps<'/salle/[codeSalle]'>) {
    const { codeSalle } = await props.params
    let joueurs = null
    let estJoueurDejaDansSalle = false
    let erreur = false
    let message = ''

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user == null) redirect('/compte/connexion')

    const salle = await lireSalle(codeSalle)
    if (salle == null || salle?.length == 0) {

        erreur = true
        message = "Cette salle n'existe pas ou ou n'existe plus."
    }
    else {
        joueurs = await lireSalleJoueur(salle[0].id)

        if (joueurs !== null) {
            for (let i = 0; i < joueurs?.length; i++) {
                if (joueurs[i].id_joueur == user.id) {
                    estJoueurDejaDansSalle = true

                }

            }
        }
        if (joueurs !== null && salle !== null && salle[0].en_cours_de_Jeu) {
            erreur = true
            message = "Cette salle est déjà en train de répondre à un quiz."
        }
        else if (joueurs !== null && salle !== null && joueurs?.length >= salle[0].nbr_joueur_max && !estJoueurDejaDansSalle) {
            erreur = true
            message = "Cette salle est déjà pleine."
        }

        else {

            if (!estJoueurDejaDansSalle) {
                await ajouterJoueurSalle({
                    id_salle: salle[0].id,
                    id_joueur: user.id,
                    nom_joueur: user.user_metadata?.username,
                })
                joueurs = await lireSalleJoueur(salle[0].id) 
            }

            // ajouterJoueurSalle({ id_salle: salle[0].id, id_joueur: user?.id, nom_joueur: user?.user_metadata?.username })

        }

    }



    return (
        <div className="flex-1 flex">

            {!erreur &&


                <ComponantSalle pSalle={salle[0]} joueursInitiaux={joueurs ?? []}
                    user={user ?? null} />
            }
            {erreur &&
                <div className="flex flex-col flex-1 items-center align-middle  justify-center">
                    <div className="flex flex-col h-full justify-center items-center">
                        <div className="flex-col flex">
                            <h1 className="text-2xl font-bold">Oups...</h1>
                            <p>{message}</p>
                        </div>
                    </div>
                </div>
            }



        </div >
    )
}

