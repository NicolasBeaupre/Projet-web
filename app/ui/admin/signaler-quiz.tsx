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

export function SignalerQuizComponent({ id_quiz, est_admin }: {  id_quiz:string, est_admin: boolean }) {
    const router = useRouter()
    const [pending, startTransition] = useTransition()
    const [open, setOpen] = useState(false)
    const [openSupression, setOpenSupression] = useState(false)
    const [message, setMessage] = useState('')
    useEffect(() => {
        setMessage('')
    }, [open])
    
    async function creerSignalement(){
        setOpen(false)
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        await ajouterSignalement(id_quiz,message,user?.id)
    }
    function Suppression(){
        supprimerQuizAdmin(id_quiz)
        router.refresh()
    }

    return (

        <div>
            
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline"><Ellipsis /></Button>} />
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <SquareExclamationPoint /> Signaler
                    </DropdownMenuItem>
                    {est_admin && (
                        <DropdownMenuItem variant="destructive" onClick={() => setOpenSupression(true)}>
                            <Trash /> Supprimer
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Signaler un quiz</DialogTitle>
                        <DialogDescription>Voulez-vous vraiment signaler ce quiz?</DialogDescription>
                    </DialogHeader>
                    <Textarea placeholder="Quelles sont les raisons de votre signalement ?" onChange={(e) => setMessage(e.target.value)}/>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Annuler</Button>} />
                        <Button variant="destructive" onClick={() => creerSignalement()}>
                            Signaler
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={openSupression} onOpenChange={setOpenSupression}>
                
                
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