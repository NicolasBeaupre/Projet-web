"use client"
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Quiz } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { set } from "react-hook-form";


export default function Jeu({ quiz }: { quiz: Quiz }) {

    const [numeroQuestion, setNumeroQuestion] = React.useState(0)

    const [pointage, setPointage] = React.useState(0)

    const [afficherQuestion, setAfficherQuestion] = useState(true)

    const handleAffichage = () =>{
        setAfficherQuestion(current => !current)
    }

    const incrementerPointage = () =>{
        setPointage(pointage + 1)
        console.log("test pointage")
        console.log(pointage)
    }

    const incrementerNumeroQuestion = () =>{
        setNumeroQuestion(numeroQuestion + 1)
        console.log("test numeroQuestion")
        console.log(numeroQuestion)
    }

    const terminerQuestion = (data: any) =>{
        console.log("test pointage externe")
        console.log(pointage)

        console.log("reponse numero")
        console.log(`reponse${data}`)

        console.log("bonneReponse")
        console.log(quiz.questions[numeroQuestion].bonneReponse)

        if (`reponse${data}` === quiz.questions[numeroQuestion].bonneReponse) {
            incrementerPointage()
        }
        console.log("test pointage externe")
        console.log(pointage)

        console.log("quiz.questions.length")
        console.log(quiz.questions.length)

        console.log("numeroQuestion+1")
        console.log(numeroQuestion+1)

        if (quiz.questions.length > numeroQuestion+1) {
            incrementerNumeroQuestion()
        }
        else{

        }


    }

    const handleClick = async (data: any) => {
        console.log("test reponse")
        console.log(data)
        terminerQuestion(data)
    }
    const handleTimer = () => {
        console.log("test timer")
        terminerQuestion("")
    }
    return (
        <div>
            {afficherQuestion==true &&
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
            </div>}


            <div className="flex justify-center items-center my-20 flex-col">
                <h2 className="text-2xl font-bold text-center w-2/5">Question {numeroQuestion+1}</h2>
                <p>{quiz.questions[numeroQuestion].titre}</p>

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
        </div>
    );
}