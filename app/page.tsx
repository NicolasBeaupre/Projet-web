import PageEnConstruction from '@/app/ui/construction';
import PlaceholderContenue from '@/app/ui/placeholder-contenue'
import { Button, buttonVariants } from "@/components/ui/button"
import { lireCategoriesQuiz, obtenirQuizLesPlusRecent } from './lib/action';
import { cn } from 'cn';
import { SignalerQuizComponent } from "@/app/ui/admin/signaler-quiz";
import { lireUtilisateurNomAdmin } from "@/app/lib/actionAdmin";
import { createClient } from '@/lib/supabase/server'
import Image from "next/image";
import Link from "next/link"
import { Star } from "lucide-react";

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  // throw new Error("bob")
  const Categorie = await lireCategoriesQuiz()
  const quiz = await obtenirQuizLesPlusRecent()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans dark:bg-black">
      <main className="flex flex-1 w-full container flex-col items-center justify-between py-20 bg-white dark:bg-black sm:items-start">
        {/* <PageEnConstruction /> */}



        <div className='w-full max-w-4xl  mx-auto'>
          <div className='flex flex-col justify-center   gap-20'>

            <h1 className='text-2xl font-bold text-center mb-5'>Catégories</h1>
            <ul className='flex w-full justify-center gap-5 flex-wrap px-4'>


              {Categorie?.map((i) => (
                <li key={i}>
                  <a href={`/categorie/${i}`} className={cn(buttonVariants({}), 'w-30 h-15 text-lg')}>{i}</a>
                </li>
              ))}




            </ul>
          </div>


        </div>

        <div className='flex flex-col justify-center w-full  mt-30 '>
          <h1 className='text-2xl font-bold text-center mb-5 py-10'>Quiz les plus récents</h1>
          <ul className="flex flex-wrap gap-10 justify-center">
            {quiz?.map((i) => {
              const src = i.imageUrl || "https://blocks.astratic.com/img/general-img-landscape.png"
              let noteTotal = 0
              let moyenneNote = 0
              let nbrEtoileVide = 5
              let nbrNote = 0
              if (i.notes !== null) {

                i.notes.forEach((n: { note: number }) => {
                  noteTotal += n.note
                });
                moyenneNote = Math.ceil(noteTotal / i.notes.length)

                nbrEtoileVide -= moyenneNote
                nbrNote = i.notes.length
              }

              return (

                <li key={i.id} className='flex flex-col justify-between align-middle items-center border-2 p-3 bg-secondary rounded-2xl  gap-5 w-60'>
                  <div className="relative flex w-full items-center justify-center">

                    <h3 className='text-2xl wrap-break-word text-center'>{i.nomQuiz}</h3>
                    <div className="absolute right-0 ">
                      <SignalerQuizComponent id_quiz={i.id} est_admin={user?.app_metadata?.est_admin} />
                    </div>
                  </div>

                  {i.categorie == 'autre' &&

                    <Image

                      src={`/imagePlaceholder.png`}
                      width={200}
                      height={200}
                      alt="Page en construction"
                      className="object-contain rounded-3xl"
                      loading="eager"
                    />
                  }{i.categorie !== 'autre' &&


                    <Image

                      src={`/${i.categorie}.png`}
                      width={300}
                      height={300}
                      alt="Page en construction"
                      className="object-contain rounded-3xl"
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
                    href={`/jeu/${i.id}`}
                    className={cn(buttonVariants(), 'text-2xl h-12')}
                  >
                    Jouer
                  </a>

                </li>
              )
            })}
          </ul>
        </div>

        {

          /* <Image
          className="dark:invert h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the{" "}
            <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
              page.tsx
            </code>{" "}
            file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert h-[14px] w-4"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div> */}
      </main>
    </div>
  );
}

async function Createur({ id }: { id: string | null }) {
  if (!id) return <p>Inconnu</p>
  const nom = await lireUtilisateurNomAdmin(id)
  if (nom == null)
    return <p className="font-bold">Inconnu</p>
  else
    return <Button variant={'link'} className='font-bold' nativeButton={false} render={<Link href={`/compte/detail/${id}`} />}>{nom}</Button>
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