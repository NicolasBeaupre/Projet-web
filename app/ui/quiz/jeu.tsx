"use client"
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Quiz } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";


export default function Jeu({ quiz }: { quiz: Quiz }) {
     const handleClick = async (data: any) => {
        console.log("test reponse")
        console.log(data)
      }
      const handleTimer = () => {
        console.log("test timer")
      }
    return (
        <div>
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
                        size={180}
                        onComplete={handleTimer}

                    >
                        {({ remainingTime }) => (
                            <div className="text-2xl font-bold">
                                {remainingTime}
                            </div>
                        )}
                    </CountdownCircleTimer>
                </div>
            </div>
            <div>
                <div>
                    <h2>{quiz.questions[0].titre}</h2>
                </div>
                <div className='grid grid-cols-2 w-full align-middle'>
                    {[1, 2, 3, 4].map((numReponse) => (
                        <div key={numReponse} className='flex items-center flex-wrap gap-5 m-5 border border-gray-300 border-8 rounded p-3'>
                            <div className="peer block w-full h-50 rounded-md border border-gray-200  text-sm outline-gray-200 focus:outline-black text-black
                  placeholder:text-gray-500 text-center m-auto">
                                <Button type="button" className="w-full h-full" onClick={() =>handleClick(numReponse)}>{(quiz.questions?.[0] as any)?.[`reponse${numReponse}`]}</Button>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </div>
    );
}