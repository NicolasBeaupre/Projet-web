'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from "react";
import { AlertBasic } from '@/app/ui/compte/alert-creation-compte'
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
import { refresh } from 'next/cache'
import { supprimerCompte } from '@/app/compte/suppression-compte-serveur';
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
export function SupprimerCompteComponent() {
    const [pending, startTransition] = useTransition()
  
    return (

        <Dialog >
                
                <DialogTrigger render={<Button  className={cn(buttonVariants({ variant: "destructive" }), 'text-lg h-8')}>Supprimer</Button>} />
                <DialogContent className="sm:max-w-sm">
                    
                        <DialogHeader>
                            <DialogTitle>Suppression du compte</DialogTitle>
                            <DialogDescription>
                                La Suppression d'un compte ne supprimera pas les quiz que vous avez créer. Cette action est permanente. 
                            </DialogDescription>
                        </DialogHeader>
                       
                        
                        <DialogFooter>
                            <DialogClose render={<Button  variant="outline">Annuler</Button>} />
                            <Button  variant={"destructive"} onClick={() => {supprimerCompte()}}  className= "">Supprimer</Button>
                        </DialogFooter>
                    
                </DialogContent>
                {/* <Button disabled={pending} onClick={() => { if (confirm('This permanently deletes your account and data. Continue?')) { startTransition(() => supprimerCompte()) } }} variant={'destructive'}>Supprimer </Button> */}
            </Dialog>


    )
}