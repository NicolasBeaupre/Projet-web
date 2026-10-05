"use client"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useState } from "react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import BtnDeconnexion from '@/components/ui/btn-deconnexion'
import type { User } from '@supabase/supabase-js'



export function AvatarDropdown({ user }: { user: User | null }) {
    const i = user?.user_metadata?.username?.[0].toUpperCase();
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full"><Avatar>
                <AvatarImage src="https://placehold.net/avatar-2.png" alt="shadcn" />
                <AvatarFallback><p className="text-lg font-bold">{i}</p></AvatarFallback>
            </Avatar></Button>} />
            <DropdownMenuContent className="w-32">
                <DropdownMenuGroup>
                    <DropdownMenuItem><Button variant="link" render={<Link href="/compte" />} nativeButton={false}>Compte</Button></DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive"><BtnDeconnexion></BtnDeconnexion></DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
