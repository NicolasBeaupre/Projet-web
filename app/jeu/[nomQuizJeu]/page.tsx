import Jeu from "@/app/ui/quiz/jeu"
import { lireUnQuiz } from "@/app/lib/action";
import { createClient } from '@/lib/supabase/server'

export default async function Page(props: PageProps<'/jeu/[nomQuizJeu]'>){
    const {nomQuizJeu} = await props.params

    const quiz =   await lireUnQuiz(nomQuizJeu)

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser()
    return (
        <div>
            <div>
                <Jeu quiz={quiz} user={user}/>
            </div>
        </div>
    )
}

