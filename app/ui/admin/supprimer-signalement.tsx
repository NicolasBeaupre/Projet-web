'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from "react";
import { AlertBasic } from '@/app/ui/compte/alert-creation-compte'
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
import { refresh } from 'next/cache'
import { ajouterSignalement, supprimerQuizAdmin, supprimerSignalement } from '@/app/lib/action';
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

export function SupprimerSignalementComponent({ id }: {  id:string }) {
    const router = useRouter()
  
    function Suppression(){
        supprimerSignalement(id)
        router.refresh()
    }

    return (

        <div>
             
           

            
            <Dialog >
                
                 <DialogTrigger  className={cn(buttonVariants({ variant: "destructive" }))}><Trash /> Supprimer le signalement</DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    
                        <DialogHeader>
                            <DialogTitle>Suppression d'un signalement</DialogTitle>
                            
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