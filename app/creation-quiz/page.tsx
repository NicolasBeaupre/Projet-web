import QuizForm from '@/app/ui/quiz/creer-form';
import { createClient } from '@/lib/supabase/server'
import { redirect } from "next/navigation";

export default async function Page(){
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect("/compte/connexion");
    return (
        <div>
            <div>
                <QuizForm user={user}/>
            </div>
        </div>
    )
}

