
import { createClient } from '@/lib/supabase/server'

import { redirect } from "next/navigation";

import { DialogModifierMotDePasse } from '../ui/compte/modifier-mot-de-passe';
import { Metadata } from 'next';
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { SupprimerQuizComponent } from '../ui/quiz/supprimer-quiz';
import { SupprimerCompteComponent } from '../ui/compte/supprimer-compte';
export const metadata: Metadata = {
    title: 'Mon Compte',
};
export default async function Compte({ searchParams,
}: {
    searchParams: Promise<{ page?: string, pageQuiz?: string }>
}) {

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect("/compte/connexion");
    const dateCreation = new Date(user.created_at).toLocaleDateString('fr-FR', {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })

    const dateDerniereConnexion = user.last_sign_in_at ?
        new Date(user.last_sign_in_at).toLocaleDateString('fr-FR', {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }) : ""




    // partie pagination
    const nbrElement = 4
    const { page } = await searchParams
    const pageCourrante = Math.max(1, Number(page) || 1)
    const aPartirDe = (pageCourrante - 1) * nbrElement
    const jusqua = aPartirDe + nbrElement - 1
    const { data: historiques, count } = await supabase.from('historique_joueurs').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range(aPartirDe, jusqua)

    const totalPages = Math.max(1, Math.ceil((count ?? 0) / nbrElement))
    const aPagePrecedente = pageCourrante > 1
    const aProchainePage = pageCourrante < totalPages

    const { pageQuiz } = await searchParams
    const pageCourranteMesQuiz = Math.max(1, Number(pageQuiz) || 1)
    const aPartirDeMesQuiz = (pageCourranteMesQuiz - 1) * nbrElement
    const jusquaMesQuiz = aPartirDeMesQuiz + nbrElement - 1
    const { data: mesQuiz, count: countMesQuiz } = await supabase.from('Quiz').select('*', { count: 'exact' }).match({ createur: user.id }).order('created_at', { ascending: false }).range(aPartirDeMesQuiz, jusquaMesQuiz)

    const totalPagesMesQuiz = Math.max(1, Math.ceil((countMesQuiz ?? 0) / nbrElement))
    const aPagePrecedenteMesQuiz = pageCourranteMesQuiz > 1
    const aProchainePageMesQuiz = pageCourranteMesQuiz < totalPagesMesQuiz
    return (
        <div className=" flex justify-center ">


            <div className=" container   flex flex-col gap-10 my-25 justify-center text-center align-middle">
                <h1 className="text-2xl font-bold ">Mon compte</h1>
                <div className='  flex justify-center '>

                    <div className=' flex flex-col gap-10 m-2 p-5 border-2 rounded-2xl'>

                        <div className='flex justify-between'>
                            <p className='text-lg'>Nom d'utilisateur :  </p>
                            <p className='text-lg'> {user.user_metadata.username}</p>

                        </div>
                        <hr></hr>

                        <div className='flex justify-between'>

                            <p>Date de création du compte : </p>
                            <p className='text-lg'>{dateCreation}</p>
                        </div>
                        <hr></hr>

                        <div className='flex justify-between'>

                            <p>Dernière connexion du compte : </p>
                            <p className='text-lg'>{dateDerniereConnexion}</p>
                        </div>
                        <hr></hr>
                        <div className='flex flex-wrap justify-center gap-10'>
                            <DialogModifierMotDePasse user={user}></DialogModifierMotDePasse>
                            <SupprimerCompteComponent />
                        </div>
                    </div>
                </div>
                <hr />

                <div >
                    <h2 className='text-2xl font-bold mb-10'>Mon historique</h2>
                    <div className='bg-gray-300 w-full p-3 justify-center items-center rounded-2xl flex gap-5 flex-col'>

                        <ul className='bg-gray-300 w-full p-3 justify-center rounded-2xl flex gap-5 flex-wrap'>

                            {historiques?.map((i) => (
                                <li key={i.id} className='flex flex-col justify-between border-2 p-3 bg-secondary rounded-2xl  gap-5 w-80'>
                                    <h3 className='text-2xl wrap-break-word'>{i.nom_quiz}</h3>


                                    <p className='text-lg '>Votre score : {i.score}/{i.nbr_question}</p>
                                    <time>{new Date(i.created_at).toLocaleDateString()}</time>
                                    {i.id_quiz == null &&
                                        <div>Le quiz a été supprimé</div>}
                                    {i.id_quiz !== null &&
                                        <a
                                            href={`/jeu/${i.nom_quiz}`}
                                            className={cn(buttonVariants(), 'text-2xl h-12')}
                                        >
                                            Jouer
                                        </a>
                                    }

                                </li>
                            ))}

                        </ul>
                        <span className='flex items-center'>

                            <a href={`/compte?page=${pageCourrante - 1}&pageQuiz=${pageCourranteMesQuiz}#historique`} className={cn(buttonVariants({ variant: 'link' }), !aPagePrecedente ? 'hidden' : '')}><ChevronLeft />Précédent</a>
                            <a href={`/compte?page=${pageCourrante + 1}&pageQuiz=${pageCourranteMesQuiz}#historique`} className={cn(buttonVariants({ variant: 'link' }), !aProchainePage ? 'hidden' : '')}>Prochain<ChevronRight /></a>
                        </span>
                    </div>

                </div>
                <div >
                    <h2 className='text-2xl font-bold mb-10'>Mes quiz</h2>
                    <div className='bg-gray-300 w-full p-3 justify-center items-center rounded-2xl flex gap-5 flex-col'>

                        <ul className='bg-gray-300 w-full p-3 justify-center rounded-2xl flex gap-5 flex-wrap'>

                            {mesQuiz?.map((i) => (
                                <li key={i.id} className='flex flex-col justify-between border-2 p-3 bg-secondary rounded-2xl  gap-5 w-80'>
                                    <h3 className='text-2xl wrap-break-word'>{i.nomQuiz}</h3>


                                    <div>créé le :  <time>{new Date(i.created_at).toLocaleDateString()}</time></div>

                                    <a
                                        href={`/jeu/${i.nomQuiz}`}
                                        className={cn(buttonVariants(), 'text-2xl h-12')}
                                    >
                                        Jouer
                                    </a>
                                    <SupprimerQuizComponent id_quiz={i.id} id_user={user.id} />

                                </li>
                            ))}
                            {mesQuiz?.length == 0 &&
                                <div className='py-10'>

                                    <p className=' py-4 text-2xl'>Vous n'avez pas encore créé de quiz</p>
                                    <a href='/creation-quiz' className={cn(buttonVariants(), 'text-2xl h-12')}>Créer en un!</a>
                                </div>
                            }

                        </ul>
                        <span className='flex items-center'>

                            <a href={`/compte?page=${pageCourrante}&pageQuiz=${pageCourranteMesQuiz - 1}#mes-quiz`} className={cn(buttonVariants({ variant: 'link' }), !aPagePrecedenteMesQuiz ? 'hidden' : '')}><ChevronLeft />Précédent</a>
                            <a href={`/compte?page=${pageCourrante}&pageQuiz=${pageCourranteMesQuiz + 1}#mes-quiz`} className={cn(buttonVariants({ variant: 'link' }), !aProchainePageMesQuiz ? 'hidden' : '')}>Prochain<ChevronRight /></a>
                        </span>
                    </div>

                </div>
            </div>
        </div>


    )
}

