"use client";

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/sidebar"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppNavbar } from "./components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
const router = useRouter();
const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
        setIsLogged(true);
    } else {
      router.push("/"); 
    }
  }, [router]);

  if (!isLogged) return null;
  return (
      <SidebarProvider>
      <AppNavbar />
      <div className="flex">
        <AppSidebar />
        <main className="mt-16 flex-1">{children}</main>
      </div>
    </SidebarProvider>
  )
}
