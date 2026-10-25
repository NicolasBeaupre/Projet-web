import JeuMultijoueur from "@/app/ui/quiz/jeu-multijoueur"
import { lireUnQuiz, lireSalleJoueur, lireSalle } from "@/app/lib/action";
import { createClient } from '@/lib/supabase/server'
import { redirect } from "next/navigation";
import { SalleJoueur, Salle } from "@/app/lib/definitions";

export default async function Page(props: PageProps<'/jeu/[nomQuizJeu]/[codeSalle]'>){
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser()
    if (user == null || user.is_anonymous) {

            redirect('/compte/connexion')
        }

    const {nomQuizJeu} = await props.params
    const {codeSalle} = await props.params

    const quiz =   await lireUnQuiz(nomQuizJeu)
    const salle =   await lireSalle(codeSalle)
    if (salle == null) {
        redirect('/creer-salle')
    }
    const joueurs =   await lireSalleJoueur(codeSalle)

    const joueurDansSalle = joueurs?.find((joueur) => joueur.id_joueur === user.id);

    if (!joueurDansSalle) {
        redirect('/')
    }


    return (
        <div>
            <div>
                <JeuMultijoueur quiz={quiz} user={user} salle={salle} joueurs={joueurs}/>
            </div>
        </div>
    )
}