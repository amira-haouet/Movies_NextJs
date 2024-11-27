"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function AppNavbar() {
    const { data: session } = useSession()

    return (
        <nav className="fixed w-full flex items-center justify-between px-4 py-3  bg-gray-50 border-b	z-50">
            <div className="flex items-center">
            <SidebarTrigger />
            <Image
                    src="/images/logo.png"
                    alt=""
                    width={100}
                    height={100}
                />
            </div>
            <div className="flex items-center">
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-32 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black sm:w-72"
                />
            </div>

            <p className="mx-3"> Hello {session?.user?.name}!</p>
            <Button variant="destructive" onClick={() => signOut()}>Sign out</Button>
            </div>
        </nav>
    );
}


