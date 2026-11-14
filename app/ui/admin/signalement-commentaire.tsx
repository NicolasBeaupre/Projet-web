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

export function SignalementDescriptionComponent({description}: {description:string}) {

    return (




        <Dialog >

            <DialogTrigger className={cn(buttonVariants({}))}>Commentaire du signalement</DialogTrigger>
            <DialogContent className="sm:max-w-sm">

                <DialogHeader>
                    <DialogTitle>Commentaire du signalement</DialogTitle>
                    
                </DialogHeader>
                                
                     <p className='py-3 italic'>« {description} »</p> 
                

                <DialogFooter>
                    <DialogClose className={cn(buttonVariants({}))}>Fermer</DialogClose>
                    
                </DialogFooter>

            </DialogContent>

        </Dialog>



    )
}