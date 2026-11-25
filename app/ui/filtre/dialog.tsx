
import { Button } from "@/components/ui/button"
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
import { Field, FieldGroup } from "@/components/ui/field"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { fetchFilteredQuiz, fetchQuizPages } from "@/app/lib/action"
import { lusitana } from '@/app/ui/fonts'
import RechercheQuiz from "./recherche"
import QuizTable from "./table"
import Pagination from "./pagination"
import { Suspense, useState, useEffect, act } from 'react';
import { QuizsTableSkeleton } from "../skeleton-quiz"
import { useSearchParams } from "next/navigation"

export  function DialogQuiz() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''
  const currentPage = Number(searchParams.get('page')) || 1
  const [totalPages, setTotalPages] = useState(1)
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let active = true

    fetchQuizPages(query).then((pages) =>{
        if (active) {
            setTotalPages(Math.max(1, pages))

        }
    }).catch((error) =>{
        console.error('Erreur de chargement des quizs : ', error)
    })
    return() => {
        active = false
    }
  },[query])
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger render={<Button className="text-gray-500" variant="outline">
                    <Field orientation="horizontal" className="w-25 sm:w-75 md:w-100"><span className="truncate">{"Science"}<span className="hidden sm:inline">{", Culture, Jeux vidéos"}</span>{"..."}</span>
                    </Field><SearchIcon /> </Button>} />
                 <DialogContent className="sm:max-w-1/2 w-100">
                    <div className="w-full">
                        <div className="flex w-full items-center justify-between">
                            <h1 className={`${lusitana.className} text-2xl`}>Quizs</h1>
                        </div>
                        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                            <RechercheQuiz placeholder="Recherchez un quiz..." />
                        </div>
                            <QuizTable query={query} currentPage={currentPage} onSelectQuiz={() => setOpen(false)}/>

                        <div className="mt-5 flex w-full justify-center">
                            <Pagination totalPages={totalPages} />
                        </div>
                    </div>
                     <DialogFooter>
                        <DialogClose render={<Button variant="outline">Annuler</Button>} />
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
