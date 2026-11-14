import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { lireSignalement, lireUnQuiz } from "../lib/action"
import { createClient } from '@/lib/supabase/server'
import { buttonVariants } from "@/components/ui/button"
import { lireUtilisateurNomAdmin } from "../lib/actionAdmin"
import { SignalementDescriptionComponent } from "../ui/admin/signalement-commentaire"
import { SupprimerQuizComponent } from "../ui/admin/supprimer-quiz"
import { notFound } from "next/navigation"

export default async function SignalementPage() {
    const signalements = await lireSignalement()
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user?.app_metadata?.est_admin !== true){
        notFound()
    }
    return (
        <div className="flex justify-center">

            <div className="container   flex flex-col gap-10 my-25 justify-center text-center align-middle">
                <h1 className="text-2xl font-bold ">Les signalements</h1>

                <div className=" flex flex-wrap gap-10 my-25 justify-center text-center align-middle">

                    {signalements.map((signalement) => (

                        <div key={signalement.id} className="border-2 flex flex-col gap-10 p-3 justify-between">
                            <div className="flex gap-1">
                                <p className="font-bold">Id du signalement :</p>
                                <p >{signalement.id}</p>
                            </div>
                            <NomQuizLien id={signalement.id_quiz} />

                            <NomUtilisateurLien id={signalement.user} />
                            {/* <p>{signalement.description}</p> */}
                            <SignalementDescriptionComponent description={signalement.description} />
                            <div className="flex gap-1">
                                <p className="font-bold">Signalé le :</p>
                                <p><time>{new Date(signalement.created_at).toLocaleDateString('fr-FR', {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}</time></p>
                            </div>
                            <SupprimerQuizComponent id_quiz={signalement.id_quiz} />
                        </div>
                    ))}



                </div>
            </div>
        </div>
    )

}


async function NomQuizLien({ id }: { id: number }) {
    const quiz = await lireUnQuiz(id)
    return <div className="flex gap-1 ">
        <p className="font-bold">Quiz signalé : </p>
        <a className={buttonVariants({  })} href={`jeu/${quiz?.id}`}>{quiz?.nomQuiz}</a>
    </div>
}

async function NomUtilisateurLien({ id }: { id: string }) {
    const userName = await lireUtilisateurNomAdmin(id)
    return <div className="flex gap-1 ">
        <p className="font-bold">Signalé par : </p>
        <p>{userName}</p>
    </div>
}