
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"


const NewQuizBtn = () => {
    return (
        <Button size="icon" className=" lg:hidden fixed bottom-15 right-15 md:bottom-30 md:right-30 h-20  w-20 rounded-full flex flex-col text-lg " render={<Link href="/creation-quiz" />} nativeButton={false} ><Plus className="size-6"/> Créer</Button>

    )
}

export default NewQuizBtn
