'use client'


import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"

import { cn } from 'cn';
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
import { supprimerCompteEnTantAdmin } from "@/app/compte/suppression-compte-serveur";
import { devenirAdmin } from "@/app/lib/actionAdmin";
import { useRouter } from "next/navigation";


export function DevenirAdminComponant({ id_user }: {  id_user:string }) {
    const router = useRouter()
    function rendreAdmin(id_user:string){
        devenirAdmin(id_user)
        router.refresh()
    }
 

    return (

        <div>
             
           

            <Dialog >

                            <DialogTrigger render={<Button className={cn(buttonVariants(), 'text-lg h-15')}>Rendre l'utilisateur administrateur</Button>} />
                            <DialogContent className="sm:max-w-sm">

                                <DialogHeader>
                                    <DialogTitle>Promotion en tant qu'administrateur</DialogTitle>
                                    <DialogDescription>
                                        Permettre à cet utilisateur de devenir administrateur lui donnera les droits de supprimer des quiz, des utilisateurs et de voir tous les signalements.
                                    </DialogDescription>
                                </DialogHeader>


                                <DialogFooter>
                                    <DialogClose render={<Button variant="outline">Annuler</Button>} />
                                    <Button variant={"destructive"} onClick={() => { rendreAdmin(id_user) }} className="">Promouvoir</Button>
                                </DialogFooter>

                            </DialogContent>

                        </Dialog>
   
        
        
        </div>


    )
}