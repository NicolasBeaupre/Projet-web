'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from "react";
import { AlertBasic } from '@/app/ui/compte/alert-creation-compte'
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
import { refresh } from 'next/cache'
import { supprimerQuiz } from '@/app/lib/action';
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
import { useTransition } from 'react'


export function SupprimerQuizComponent({ id_user,id_quiz }: { id_user: string , id_quiz:string }) {
    const [pending, startTransition] = useTransition()
    
    return (

        <Dialog >
                
                <DialogTrigger render={<Button  className={cn(buttonVariants({ variant: "destructive" }), 'text-lg h-8')}>Supprimer</Button>} />
                <DialogContent className="sm:max-w-sm">
                    
                        <DialogHeader>
                            <DialogTitle>Suppression d'un quiz</DialogTitle>
                            <DialogDescription>
                                La Suppression d'un quiz ne supprimera pas les historiques de joueurs ayant fait ce quiz. Cette action est permanente. 
                            </DialogDescription>
                        </DialogHeader>
                       
                        
                        <DialogFooter>
                            <DialogClose render={<Button  variant="outline">Annuler</Button>} />
                            <Button  variant={"destructive"} onClick={() => {supprimerQuiz(id_user,id_quiz)}}  className= "">Supprimer</Button>
                        </DialogFooter>
                    
                </DialogContent>
               
            </Dialog>


    )
}