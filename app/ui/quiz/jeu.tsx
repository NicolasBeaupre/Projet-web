"use client"
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Quiz } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CircleX, Star, CircleCheck } from "lucide-react";
import { ajouterNote } from "@/app/lib/action";
import type { User } from '@supabase/supabase-js'
import { ajouterTentativeQuiz } from "@/app/lib/action";


export default function Jeu({ quiz, user }: { quiz: Quiz, user: User | null }) {


    const [noteQuiz, setNoteQuiz] = React.useState(0)

    const [numeroQuestion, setNumeroQuestion] = React.useState(0)

    const [pointage, setPointage] = React.useState(0)

    const [reponse, setReponse] = React.useState("")

    const [afficherQuestion, setAfficherQuestion] = useState(true)

    const [terminerQuiz, setTerminerQuiz] = useState(false)

    const tentativeEnregistree = React.useRef(false)
    useEffect(() => {
        if (terminerQuiz && !tentativeEnregistree.current) {
            let score = pointage
            tentativeEnregistree.current = true
            // if (quiz.questions[numeroQuestion].bonneReponse == reponse) score +
            ajouterTentativeQuiz(Number(quiz.id), score, quiz.questions.length)
        }
    }, [terminerQuiz])

    const handleNoteQuiz = async (data: any) => {
        setNoteQuiz(noteQuiz => data)
        modifierNoteBD(data)
    }

    const handleReponse = (data: any) => {
        setReponse(reponse => `reponse${data}`)
    }

    async function modifierNoteBD(data: any) {
        await ajouterNote(quiz.id, data, user?.id)
    }

    const handleAffichage = () => {
        setAfficherQuestion(current => !current)
    }
    const handleTerminerQuiz = () => {
        setTerminerQuiz(current => !current)
    }
    const incrementerPointage = () => {
        setPointage(pointage + 1)
    }

    const incrementerNumeroQuestion = () => {
        setNumeroQuestion(numeroQuestion + 1)
    }

    const terminerQuestion = (data: any) => {
        handleReponse(data)
        if (`reponse${data}` === quiz.questions[numeroQuestion].bonneReponse) {
            incrementerPointage()
        }
        handleAffichage()
    }

    const prochaineQuestion = () => {
        if (quiz.questions.length > numeroQuestion + 1) {
            incrementerNumeroQuestion()
            handleAffichage()
        }
        else {
            handleTerminerQuiz()
        }
    }

    const handleClick = async (data: any) => {
        terminerQuestion(data)
    }
    const handleTimer = () => {
        terminerQuestion("")
    }
    return (
        <div>
            {afficherQuestion == true && terminerQuiz == false &&
                <div>
                    <div className="fixed flex justify-center my-5 top-15 right-5 sm:right-15">
                        <CountdownCircleTimer
                            isPlaying
                            duration={30}
                            colors={['#22C55E', '#EAB308', '#EF4444']}
                            colorsTime={[30, 15, 0]}
                            size={120}
                            onComplete={handleTimer}
                        >
                            {({ remainingTime }) => (
                                <div className="text-2xl font-bold">
                                    {remainingTime}
                                </div>
                            )}
                        </CountdownCircleTimer>
                    </div>



                    <div className="flex justify-center items-center my-20 flex-col text-center">
                        <h2 className="text-2xl font-bold">Question {numeroQuestion + 1}</h2>
                        <p className="text-lg">{quiz.questions[numeroQuestion].titre}</p>

                    </div>

                    <div>
                        <div className='grid sm:grid-cols-2 w-full align-middle'>
                            {[1, 2, 3, 4].map((numReponse) => (
                                <div key={numReponse} className='flex items-center flex-wrap my-5 rounded'>
                                    <div className="peer block w-5/6 sm:h-50 h-25 rounded-md border border-gray-200 focus:outline-black text-black
                  placeholder:text-gray-500 text-center m-auto">
                                        <Button type="button" className="w-full h-full text-lg font-bold" onClick={() => handleClick(numReponse)}>{(quiz.questions?.[numeroQuestion] as any)?.[`reponse${numReponse}`]}</Button>
                                    </div>
                                </div>
                            ))}


                        </div>
                    </div>
                </div>}
            {afficherQuestion == false && terminerQuiz == false &&
                <div>
                    <div>
                        <div className="flex justify-center items-center my-20 flex-col text-center">
                            {quiz.questions[numeroQuestion].bonneReponse == reponse &&
                                <div className="text-green-700">
                                    <div className="flex align-center justify-center">
                                        <h2 className="text-2xl font-bold mx-4">Bonne réponse !</h2>
                                        <p><CircleCheck size={30} /></p>
                                    </div>
                                    <p className="text-2xl font-bold">Votre score : {pointage}/{numeroQuestion + 1}</p>
                                </div>
                            }
                            {quiz.questions[numeroQuestion].bonneReponse != reponse &&
                                <div className="text-red-700">
                                    <div className="flex align-center justify-center">
                                        <h2 className="text-2xl font-bold mx-4">Mauvaise réponse ! </h2>
                                        <p><CircleX size={30} /></p>
                                    </div>
                                    <p className="text-2xl font-bold">Votre score : {pointage}/{numeroQuestion + 1}</p>
                                </div>
                            }
                            <Button type="button" className="my-5 w-100 h-20 text-lg font-bold" onClick={prochaineQuestion}>Prochaine question</Button>
                        </div>
                        <div className="fixed flex justify-center my-5 top-15 right-5 sm:right-15">
                            <CountdownCircleTimer
                                isPlaying
                                duration={10}
                                colors={['#22C55E', '#EAB308', '#EF4444']}
                                colorsTime={[10, 5, 0]}
                                size={120}
                                onComplete={prochaineQuestion}
                            >
                                {({ remainingTime }) => (
                                    <div className="text-2xl font-bold">
                                        {remainingTime}
                                    </div>
                                )}
                            </CountdownCircleTimer>
                        </div>
                    </div>
                    <div className="flex items-center my-20 flex-col text-center">
                        <h2 className="text-2xl font-bold">Question {numeroQuestion + 1}</h2>
                        <p className="text-lg">{quiz.questions[numeroQuestion].titre}</p>

                    </div>

                    <div>
                        <div className='grid sm:grid-cols-2 w-full align-middle'>
                            {[1, 2, 3, 4].map((numReponse) => (
                                <div key={numReponse} className='flex items-center flex-wrap my-5 rounded'>
                                    <div className="peer block w-5/6 sm:h-50 h-25 rounded-md border border-gray-200 focus:outline-black text-black
                  placeholder:text-gray-500 text-center m-auto">
                                        {`reponse${numReponse}` == quiz.questions[numeroQuestion].bonneReponse &&
                                            <Button type="button" className="w-full h-full text-lg font-bold bg-green-800" disabled>{(quiz.questions?.[numeroQuestion] as any)?.[`reponse${numReponse}`]}</Button>
                                        }
                                        {`reponse${numReponse}` != quiz.questions[numeroQuestion].bonneReponse && `reponse${numReponse}` == reponse &&
                                            <Button type="button" className="w-full h-full text-lg font-bold bg-red-800" disabled>{(quiz.questions?.[numeroQuestion] as any)?.[`reponse${numReponse}`]}</Button>
                                        }
                                        {`reponse${numReponse}` != quiz.questions[numeroQuestion].bonneReponse && `reponse${numReponse}` != reponse &&
                                            <Button type="button" className="w-full h-full text-lg font-bold" disabled>{(quiz.questions?.[numeroQuestion] as any)?.[`reponse${numReponse}`]}</Button>
                                        }
                                    </div>
                                </div>
                            ))}


                        </div>
                    </div>
                </div>

            }
            {terminerQuiz == true &&
                <div>
                    <div className="flex justify-center items-center my-20 flex-col text-center">
                        <h2 className="text-2xl font-bold my-3">Quiz terminé !</h2>
                        {quiz.questions[numeroQuestion].bonneReponse == reponse &&
                            <h2 className="text-2xl font-bold">Votre score final : {pointage}/{numeroQuestion + 1}</h2>
                        }
                        {quiz.questions[numeroQuestion].bonneReponse != reponse &&
                            <h2 className="text-xl font-bold">Votre score final: {pointage}/{numeroQuestion + 1}</h2>
                        }
                        {user !== undefined &&
                            <div className="border-black border-10 bg-gray-100 w-1/2 h-40 rounded my-5">
                                <h3 className="text-xl font-bold">Notez le quiz</h3>
                                <div className="flex justify-center">
                                    {[1, 2, 3, 4, 5].map((note) => (
                                        <Star key={note} size={30} className={`mx-1 my-5 hover:text-yellow-300 ${note <= noteQuiz ? "fill-yellow-300" : "fill-white"}`} onClick={() => handleNoteQuiz(note)} />
                                    ))}
                                </div>

                            </div>
                        }
                        <Link href={'/'}>
                            <Button type="button" className="my-5 w-100 h-20 text-lg font-bold">Retour à l'accueil</Button>
                        </Link>
                    </div>

                </div>
            }

        </div>
    );
}