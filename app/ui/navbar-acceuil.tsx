"use client"
import * as React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Menu } from "lucide-react"

import { Plus } from 'lucide-react';
import { SearchIcon } from "lucide-react"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet"


const NavbarAcceuil = () => {
    const [open, setOpen] = useState(false)
    return (

        <header className="sticky flex justify-center top-0 z-50 w-full border-b bg-secondary backdrop-blur supports-[backdrop-filter]:bg-secondary">
            <nav className="container mx-auto flex h-16  items-center bg-secondary justify-around px-4">
                

                    <a href="#" className="text-3xl font-bold">
                        Logo
                    </a>
                    <div className="hidden lg:flex lg:not items-center gap-2">

                        <Button className="h-8 text-xl" ><Plus /> Créer</Button>

                    </div>
            
                {/* pc nav */}
                <div className="hidden md:flex items-center gap-2">
                    <Field orientation="horizontal" className="w-100 ">
                        <Input type="search" placeholder="Science, Culture, Jeux vidéos..." />
                        <Button className="" size="icon"><SearchIcon /></Button>
                    </Field>
                </div>


                <div className="hidden md:flex items-center gap-2">
                    <Button className="" >Se connecter</Button>
                    <Button className="" variant="secondary">Rejoindre</Button>
                </div>

                {/* Mobile hamburger */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger  render={<Button variant="ghost"  className="md:hidden" />}>
                        
                            <Menu className="size-8" />
                           
                     
                    </SheetTrigger>
                    
                    <SheetContent side="right" className=" pl-3">
                        <SheetTitle className="text-left pt-3 text-2xl">Logo</SheetTitle>
                        <nav className="mt-6 flex flex-col gap-4 justify-between h-full">
                            <Field className="mb-20" orientation="horizontal">
                                <Input type="search" placeholder="Search..." />
                                <Button className="" size="icon"><SearchIcon /></Button>
                            </Field>

                            <div className="flex flex-col gap-2 my-15">

                                <Button className="h-10 text-2xl" >Se connecter</Button>
                                <Button className="h-10 text-2xl" variant="secondary" >Rejoindre</Button>

                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>


    )
}

export default NavbarAcceuil

