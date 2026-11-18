

import { lireUtilisateurAdmin } from '@/app/lib/actionAdmin'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { supprimerCompteEnTantAdmin } from '../../suppression-compte-serveur'
import { SupprimerUserAdminComponant } from '@/app/ui/admin/supprimer-user-admin'
import { DevenirAdminComponant } from '@/app/ui/admin/devenir-admin'


export default async function Page(props: PageProps<'/compte/detail/[idUser]'>) {
    const { idUser } = await props.params


    const supabase = await createClient();
    const utilisateur = await lireUtilisateurAdmin(idUser)
    if (utilisateur == null) notFound()

    const dateCreation = new Date(utilisateur?.dateCreation).toLocaleDateString('fr-FR', {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })

    const dateDerniereConnexion = utilisateur?.derniereConnexion ?
        new Date(utilisateur?.derniereConnexion).toLocaleDateString('fr-FR', {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }) : ""




    // partie pagination
    const nbrElement = 4
    const { pageQuiz } = await props.searchParams
    const pageCourranteMesQuiz = Math.max(1, Number(pageQuiz) || 1)
    const aPartirDeMesQuiz = (pageCourranteMesQuiz - 1) * nbrElement
    const jusquaMesQuiz = aPartirDeMesQuiz + nbrElement - 1
    const { data: mesQuiz, count: countMesQuiz } = await supabase.from('Quiz').select('*', { count: 'exact' }).match({ createur: idUser }).order('created_at', { ascending: false }).range(aPartirDeMesQuiz, jusquaMesQuiz)

    const totalPagesMesQuiz = Math.max(1, Math.ceil((countMesQuiz ?? 0) / nbrElement))
    const aPagePrecedenteMesQuiz = pageCourranteMesQuiz > 1
    const aProchainePageMesQuiz = pageCourranteMesQuiz < totalPagesMesQuiz

    const { data: { user } } = await supabase.auth.getUser()
    const est_admin = user?.app_metadata?.est_admin



    return (
        <div className=" flex justify-center ">


            <div className=" container   flex flex-col gap-10 my-25 justify-center text-center align-middle">
                <h1 className="text-2xl font-bold ">{utilisateur.userName}</h1>
                <div className='  flex justify-center '>

                    <div className=' flex flex-col gap-10 m-2 p-5 border-2 rounded-2xl'>

                        <div className='flex justify-between'>
                            <p className='text-lg'>Nom d'utilisateur :  </p>
                            <p className='text-lg'> {utilisateur?.userName}</p>

                        </div>
                        <hr />
                        {utilisateur?.est_admin == true &&
                            <div>
                                <div className='flex justify-between '>
                                    <p className='text-lg'>Role:  </p>
                                    <p className='text-lg'>Administateur</p>

                                </div>
                            </div>
                        }
                        {utilisateur?.est_admin == true &&

                            <hr></hr>
                        }

                        <div className='flex justify-between'>

                            <p>Date de création du compte : </p>
                            <p className='text-lg'>{dateCreation}</p>
                        </div>
                        <hr></hr>

                        <div className='flex justify-between'>

                            <p>Dernière connexion du compte : </p>
                            <p className='text-lg'>{dateDerniereConnexion}</p>
                        </div>


                    </div>
                </div>
                <div>
                    {est_admin && (

                        <SupprimerUserAdminComponant id_user={idUser} />

                    )}
                    {est_admin && utilisateur.est_admin !== true &&
                    <div className='pt-10'>

                        <DevenirAdminComponant id_user={idUser} />
                    </div>
                    }
                </div>
                <hr />

                <div >
                    <h2 className='text-2xl font-bold mb-10'>Quiz créé par {utilisateur.userName}</h2>
                    <div className='bg-gray-300 w-full p-3 justify-center items-center rounded-2xl flex gap-5 flex-col'>

                        <ul className='bg-gray-300 w-full p-3 justify-center rounded-2xl flex gap-5 flex-wrap'>

                            {mesQuiz?.map((i) => (
                                <li key={i.id} className='flex flex-col justify-between border-2 p-3 bg-secondary rounded-2xl  gap-5 w-80'>
                                    <h3 className='text-2xl wrap-break-word'>{i.nomQuiz}</h3>


                                    <div>créé le :  <time>{new Date(i.created_at).toLocaleDateString()}</time></div>

                                    <a
                                        href={`/jeu/${i.id}`}
                                        className={cn(buttonVariants(), 'text-2xl h-12')}
                                    >
                                        Jouer
                                    </a>


                                </li>
                            ))}

                        </ul>
                        <span className='flex items-center'>

                            <a href={`/compte/detail/${idUser}?pageQuiz=${pageCourranteMesQuiz - 1}#mes-quiz`} className={cn(buttonVariants({ variant: 'link' }), !aPagePrecedenteMesQuiz ? 'hidden' : '')}><ChevronLeft />Précédent</a>
                            <a href={`/compte/detail/${idUser}?pageQuiz=${pageCourranteMesQuiz + 1}#mes-quiz`} className={cn(buttonVariants({ variant: 'link' }), !aProchainePageMesQuiz ? 'hidden' : '')}>Prochain<ChevronRight /></a>
                        </span>
                    </div>

                </div>
            </div>
        </div>


    )
}

