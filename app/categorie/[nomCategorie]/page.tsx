import Jeu from "@/app/ui/quiz/jeu"
import { lireLesQuizDUneCategorie, lireCategoriesQuiz } from "@/app/lib/action";
import { createClient } from '@/lib/supabase/server'
import { notFound } from "next/navigation";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { lireUtilisateurNomAdmin } from "@/app/lib/actionAdmin";
import { CircleX, Star, CircleCheck } from "lucide-react";
import Image from "next/image";

export default async function Page(props: PageProps<'/categorie/[nomCategorie]'>) {
    const { nomCategorie } = await props.params
    let categorieExiste = false
    const categorie = await lireCategoriesQuiz()
    if (categorie !== null) {
        for (let i = 0; i < categorie?.length; i++) {
            if (categorie[i] !== null && categorie[i] == nomCategorie) {
                categorieExiste = true
            }
        }
    }
    if (!categorieExiste) {
        notFound()
    }
    const quiz = await lireLesQuizDUneCategorie(nomCategorie)



    return (
        <div className="flex justify-center">

            <div className="flex flex-col flex-1 items-center align-middle container justify-center py-20 font-sans dark:bg-black">

                <h2 className="text-3xl font-bold  mb-10">{nomCategorie}</h2>

                <p className="text-2xl font-bold mb-5">Les jeux de cette catégorie</p>
                <ul className="flex flex-wrap gap-10 justify-center">
                    {quiz?.map((i) => {
                        const src = i.imageUrl || "https://blocks.astratic.com/img/general-img-landscape.png"
                        let noteTotal = 0
                        let moyenneNote = 0
                        let nbrEtoileVide = 5
                        let nbrNote = 0
                        if (i.notes !== null) {

                            i.notes.forEach(n => {
                                noteTotal += n.note
                            });
                            moyenneNote = Math.ceil(noteTotal / i.notes.length)

                            nbrEtoileVide -= moyenneNote
                            nbrNote = i.notes.length
                        }

                        return (

                            <li key={i.id} className='flex flex-col justify-between align-middle items-center border-2 p-3 bg-secondary rounded-2xl  gap-5 w-80'>
                                <h3 className='text-2xl wrap-break-word text-center'>{i.nomQuiz}</h3>

                                {i.imageUrl !== '' || i.imageUrl !== null &&

                                    <img src={src} alt="image du quiz" />
                                }{i.imageUrl == '' || i.imageUrl == null &&


                                    <Image
                                        src="/imagePlaceholder.png"
                                        width={150}
                                        height={150}
                                        alt="Page en construction"
                                        className="object-contain "
                                        loading="eager"
                                    />
                                }

                                <div className="flex gap-3">
                                    <p>Créé le :</p>
                                    <time>{new Date(i.created_at).toLocaleDateString()}</time>
                                </div>
                                <div className="flex gap-3">
                                    <p>Créé par :</p>
                                    <Createur id={i.createur} />

                                </div>
                                <div className="flex gap-5">
                                    <Etoile nbrEtoilePleine={moyenneNote} nbrEtoileVide={nbrEtoileVide} />
                                    <p>({nbrNote} note(s))</p>
                                </div>
                                <a
                                    href={`/jeu/${i.nomQuiz}`}
                                    className={cn(buttonVariants(), 'text-2xl h-12')}
                                >
                                    Jouer
                                </a>

                            </li>
                        )
                    })}

                </ul>
            </div>
        </div>
    )
}

async function Createur({ id }: { id: string | null }) {
    if (!id) return <p>Inconnu</p>
    const nom = await lireUtilisateurNomAdmin(id)
    return <p className="font-bold">{nom ?? 'Inconnu'}</p>
}

function Etoile({ nbrEtoilePleine, nbrEtoileVide }: { nbrEtoilePleine: number, nbrEtoileVide: number }) {
    const etoiles = []
    for (let e = 0; e < nbrEtoilePleine; e++) {
        etoiles.push(
            <Star
                key={e}
                className={"fill-yellow-400 text-yellow-400"}
            />
        )

    }
    for (let e = 0; e < nbrEtoileVide; e++) {
        etoiles.push(
            <Star
                key={`${e}Vide`}
                className={""}
            />
        )
    }

    return (
        <div className="flex">{etoiles}</div>
    )
}