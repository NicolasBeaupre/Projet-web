'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from "react";
import { AlertBasic } from '@/app/ui/compte/alert-creation-compte'
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
import { refresh } from 'next/cache'
import { ajouterSignalement, supprimerQuizAdmin } from '@/app/lib/action';
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTransition } from 'react'
import { Ellipsis, Trash, SquareExclamationPoint } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export function SupprimerQuizComponent({ id_quiz }: {  id_quiz:string }) {
    const router = useRouter()
  
    function Suppression(){
        supprimerQuizAdmin(id_quiz)
        router.refresh()
    }

    return (

        <div>
             
           

            
            <Dialog >
                
                 <DialogTrigger  className={cn(buttonVariants({ variant: "destructive" }))}><Trash /> Supprimer le quiz</DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    
                        <DialogHeader>
                            <DialogTitle>Suppression d'un quiz</DialogTitle>
                            <DialogDescription>
                                La Suppression d'un quiz ne supprimera pas les historiques de joueurs ayant fait ce quiz. Cette action est permanente. 
                            </DialogDescription>
                        </DialogHeader>
                       
                        
                        <DialogFooter>
                            <DialogClose render={<Button  variant="outline">Annuler</Button>} />
                            <Button  variant={"destructive"} onClick={() => {Suppression()}}  className= "">Supprimer</Button>
                        </DialogFooter>
                    
                </DialogContent>
               
            </Dialog>
        
        </div>


    )
}