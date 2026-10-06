"use client"
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Quiz } from "@/app/lib/definitions";


export default function Jeu({quiz} : {quiz: Quiz}) {

    return (
        <div className="flex justify-center">
            <div>
                <h2>{quiz.nomQuiz}</h2>
            </div>
            <div>
                <CountdownCircleTimer
                    isPlaying
                    duration={30}
                    colors={['#22C55E', '#EAB308', '#EF4444']}
                    colorsTime={[30, 15, 0]}

                >
                    {({ remainingTime }) => (
                        <div className="text-2xl font-bold">
                            {remainingTime}
                        </div>
                    )}
                </CountdownCircleTimer>
            </div>
        </div>
    );
}