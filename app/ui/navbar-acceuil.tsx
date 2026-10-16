"use client"
import * as React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Menu } from "lucide-react"
import Link from "next/link"
import { Plus } from 'lucide-react';
import { SearchIcon } from "lucide-react"
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import { AvatarDropdown } from "./compte/avatar"
import BtnDeconnexion from '@/components/ui/btn-deconnexion'

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet"


export default function NavbarAcceuil({ user }: { user: User | null }) {
    const [open, setOpen] = useState(false)

    return (

        <header className="sticky flex justify-center top-0 z-50 w-full border-b bg-secondary backdrop-blur supports-[backdrop-filter]:bg-secondary">
            <nav className="container mx-auto flex h-16  items-center bg-secondary justify-around px-4">

                <Button variant="link" className="text-3xl font-bold" render={<Link href="/" />} nativeButton={false}  >Quiztro</Button>

                <div className="hidden lg:flex lg:not items-center gap-2">

                    <Button className="h-8 text-xl" render={<Link href="/creation-quiz" />} nativeButton={false}  ><Plus /> Créer</Button>

                </div>

                {/* pc nav */}
                <div className="hidden md:flex items-center gap-2">
                    <Field orientation="horizontal" className="w-100 ">
                        <Input type="search" placeholder="Science, Culture, Jeux vidéos..." />
                        <Button className="" size="icon"><SearchIcon /></Button>
                    </Field>
                </div>


                <div className="flex items-center  gap-2">
                    {user == null &&
                        <div className="hidden md:flex">

                            <Button render={<Link href="/compte/connexion" />} nativeButton={false}  >Se connecter</Button>

                            <Button className="" variant="secondary" render={<Link href="/compte/creation" />} nativeButton={false}  >Rejoindre</Button>
                        </div>
                    }
                    {user !== null &&
                        <div>
                            <AvatarDropdown user={user}></AvatarDropdown>
                        </div>
                    }




                    {/* Mobile hamburger */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger render={<Button variant="ghost" className="md:hidden" />}>

                            <Menu className="size-8" />


                        </SheetTrigger>

                        <SheetContent side="right" className=" pl-3">
                            <SheetTitle className="text-left pt-3 text-2xl"> <Button variant="link" className="text-3xl font-bold" render={<Link href="/" />} nativeButton={false}  >Quiztro</Button></SheetTitle>
                            <nav className="mt-6 flex flex-col gap-4 justify-between h-full">
                                <Field className="mb-20" orientation="horizontal">
                                    <Input type="search" placeholder="Science, Culture, Jeux vidéos..." />
                                    <Button className="" size="icon"><SearchIcon /></Button>
                                </Field>


                                <div className="flex flex-col gap-2 my-15">
                                    {user == null &&
                                        <div className="flex flex-col ">

                                            <Button className="h-10 text-2xl" render={<Link href="/compte/connexion" />} nativeButton={false}  >Se connecter</Button>

                                            <Button className="h-10 text-2xl" variant="secondary" render={<Link href="/compte/creation" />} nativeButton={false}  >Rejoindre</Button>
                                        </div>
                                    }
                                    {user !== null &&

                                        <Button className="text-2xl h-12" render={<Link href="/compte" />} nativeButton={false}>Mon compte</Button>
                                    }
                                    


                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>


    )
}
