import { fetchFilteredQuiz } from '../../lib/action';
import Link from 'next/link';
import { QuizsTableSkeleton } from '../skeleton-quiz';
import { useState, useEffect } from 'react';
import { Quiz } from '@/app/lib/definitions';

export default function QuizTable({
  query,
  currentPage,
  onSelectQuiz,
}: {
  query: string;
  currentPage: number;
  onSelectQuiz?: () => void;
}) {
  const [quizs, setQuizs] = useState<Quiz[]>([])
  const [enChargement, setEnChargement] = useState(true);

  useEffect(() => {
    let active = true
    setEnChargement(true)

    fetchFilteredQuiz(query, currentPage).then((data) => {
      if (active) {
        setQuizs(Array.isArray(data) ? data : [])

      }
    }).catch((error) => {
      console.error('Erreur de chargement des quizs : ', error)
      if (active) {
        setQuizs([]);

      }
    })
      .finally(() => {
        if (active) {
          setEnChargement(false)
        }
      })
    return () => {
      active = false
    }
  }, [query, currentPage])

  if (enChargement) {
    return <QuizsTableSkeleton />
  }

  return (

    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {quizs?.map((quiz) => (
              <Link key={quiz.id} href={`/jeu/${quiz.id}`} className='mb-2 w-full rounded-md bg-white p-4'>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{quiz.nomQuiz}</p>
                    </div>
                    <div className='mb-2 flex items-center'></div>
                    <p className="text-sm text-gray-500">{quiz.categorie}</p>
                  </div>
                </div>

              </Link>))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Titre
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Catégorie
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {quizs?.map((quiz) => (
                <tr
                  key={quiz.id}
                  className=" group w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap p-0 group-hover:bg-gray-100">
                    <Link href={`/jeu/${quiz.id}`} onClick={() => onSelectQuiz?.()} className='block px-3 py-3 w-full group-hover:underline'>
                      {quiz.nomQuiz}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap p-0 group-hover:bg-gray-100">
                    <Link href={`/jeu/${quiz.id}`} onClick={() => onSelectQuiz?.()} className=' px-3 py-3 block group-hover:underline'>
                      {quiz.categorie}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
