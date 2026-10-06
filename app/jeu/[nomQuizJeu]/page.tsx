import Jeu from "@/app/ui/quiz/jeu"
import { lireUnQuiz } from "@/app/lib/action";

export default async function Page(props: PageProps<'/jeu/[nomQuizJeu]'>){
    const {nomQuizJeu} = await props.params

    const quiz =   await lireUnQuiz(nomQuizJeu)
    return (
        <div>
            <div>
                <Jeu quiz={quiz}/>
            </div>
        </div>
    )
}

