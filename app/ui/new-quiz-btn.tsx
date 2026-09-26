
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
const NewQuizBtn = () => {
    return (
        <Button size="icon" className=" lg:hidden fixed bottom-15 right-15 md:bottom-30 md:right-30 h-20  w-20 rounded-full flex flex-col text-lg " ><Plus className="size-6"/> Créer</Button>

    )
}

export default NewQuizBtn
