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


export function SupprimerUserAdminComponant({ id_user }: {  id_user:string }) {
    
  
 

    return (

        <div>
             
           

            <Dialog >

                            <DialogTrigger render={<Button className={cn(buttonVariants({ variant: "destructive" }), 'text-lg h-15 w-50')}>Supprimer l'utilisateur</Button>} />
                            <DialogContent className="sm:max-w-sm">

                                <DialogHeader>
                                    <DialogTitle>Suppression du compte</DialogTitle>
                                    <DialogDescription>
                                        La Suppression d'un compte ne supprimera pas les quiz que vous avez créer. Cette action est permanente.
                                    </DialogDescription>
                                </DialogHeader>


                                <DialogFooter>
                                    <DialogClose render={<Button variant="outline">Annuler</Button>} />
                                    <Button variant={"destructive"} onClick={() => { supprimerCompteEnTantAdmin(id_user) }} className="">Supprimer</Button>
                                </DialogFooter>

                            </DialogContent>

                        </Dialog>
   
        
        
        </div>


    )
}