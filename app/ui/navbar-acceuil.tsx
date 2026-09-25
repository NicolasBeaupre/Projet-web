"use client"
import * as React from "react"
import { useState } from "react"
import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
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

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
]

const NavbarAcceuil = () => {
    const [open, setOpen] = useState(false)
    return (

        <header className="sticky flex justify-center top-0 z-50 w-full border-b bg-secondary backdrop-blur supports-[backdrop-filter]:bg-secondary">
            <nav className="container mx-auto flex h-16  items-center bg-secondary justify-around px-4">

                <a href="#" className="text-lg font-bold">
                    Logo
                </a>
                <div className="hidden md:flex items-center gap-2">
                    <a className={buttonVariants()}><Plus/> Créer</a>
                </div>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-2">
                    <Field orientation="horizontal" className="w-100">
                        <Input type="search" placeholder="Science, Culture, Jeux vidéos..." />
                        <Button className="" size="icon"><SearchIcon /></Button>
                    </Field>
                </div>


                <div className="hidden md:flex items-center gap-2">
                    <a className={buttonVariants({ variant: "secondary" })}>Se connecter</a>
                    <a className={buttonVariants()}>Rejoindre</a>
                </div>

                {/* Mobile menu */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger >
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Menu hamburger</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className=" pl-3 ">
                        <SheetTitle className="text-left">Logo</SheetTitle>
                        <nav className="mt-6 flex flex-col gap-4">
                            <Field className="mb-20" orientation="horizontal">
                                <Input type="search" placeholder="Search..." />
                                <Button className="" size="icon"><SearchIcon /></Button>
                            </Field>

                            <div className="flex flex-col gap-2 mt-4">
                                <a className={buttonVariants({ variant: "secondary" })}>Se connecter</a>
                                <a className={buttonVariants()}>Rejoindre</a>
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
        

    )
}

export default NavbarAcceuil

