import QuizForm from '@/app/ui/quiz/creer-form';
import { createClient } from '@/lib/supabase/server'
import { redirect } from "next/navigation";
import { lireUnQuiz} from "@/app/lib/action";

export default async function Page(props: PageProps<'/modifier-quiz/[idQuiz]'>) {
    const { idQuiz } = await props.params
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser()
    if (user == null || user.is_anonymous) {

        redirect('/compte/connexion')
    }



    const quiz = await lireUnQuiz(Number(idQuiz))

    if (user.id != quiz.createur) {
        redirect('/')
    }
    return (
        <div>
            <div>
                <QuizForm user={user} quizInitial={quiz}/>
            </div>
        </div>
    )
}
