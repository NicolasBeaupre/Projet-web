
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server'

import ComponentsCreationQuizMultijoueur from '@/app/ui/quiz/creation-quiz-multijoueur';

import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "Quiz multijoueur",
}



export default async function PageCreationQuizMultijoueur() {


    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user == null || user.is_anonymous) {

        redirect('/compte/connexion')
    }



    return (
        <div className='flex flex-1 justify-center'>






            <ComponentsCreationQuizMultijoueur></ComponentsCreationQuizMultijoueur>

        </div>


    )
}