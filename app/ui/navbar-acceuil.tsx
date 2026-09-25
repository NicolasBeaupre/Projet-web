"use client"
import * as React from "react"
import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"


const NavbarAcceuil = () => {
    return (
        <div className="">
            <nav className="bg-primary p-10 bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
                <a
                    href="#"
                    className={buttonVariants({ variant:"default"})}
                >
                    Se connecter
                </a>
                <a
                    href="#"
                    className={buttonVariants({ variant:"default"})}
                >
                    Se connecter
                </a>
            </nav>

        </div>
    )
}

export default NavbarAcceuil
