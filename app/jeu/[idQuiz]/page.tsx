import Jeu from "@/app/ui/quiz/jeu"
import { lireUnQuiz } from "@/app/lib/action";
import { createClient } from '@/lib/supabase/server'

export default async function Page(props: PageProps<'/jeu/[idQuiz]'>){
    const {idQuiz} = await props.params

    const quiz =   await lireUnQuiz(Number(idQuiz))

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

