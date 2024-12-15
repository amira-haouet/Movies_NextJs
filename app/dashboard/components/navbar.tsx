"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/themeToggle";
import { setSearchTerm } from "@/app/store/searchObservable";

interface AppNavbarProps {
  onSearch: (term: string) => void;
}

export function AppNavbar({ onSearch }: AppNavbarProps) {
  const { data: session } = useSession();

  return (
    <nav className="fixed w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-[#31363F] border-b z-50 text-black dark:text-white">
      <div className="flex items-center">
        <SidebarTrigger />
        <Image src="/images/logo.png" alt="" width={100} height={100} className="hidden sm:block" />
        <Image
          src="/images/cinema.svg"
          alt=""
          width={20}
          height={20}
          className="block sm:hidden"
        />
      </div>

      <div className="flex items-center">
        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-32 rounded-lg border border-gray-300 dark:bg-[#31363F] px-4 py-2 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-black md:w-72 mr-2"
          onChange={(e) => setSearchTerm(e.target.value)} // Met à jour via l'observable
          />
        <p className="mx-3 hidden sm:block">Hello {session?.user?.name}!</p>
        <ThemeToggle />
        <Button variant="destructive" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    </nav>
  );
}
