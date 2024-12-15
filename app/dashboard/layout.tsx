"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/sidebar";
import { AppNavbar } from "./components/navbar";
import React, { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <SidebarProvider>
      <AppNavbar onSearch={(term: string) => setSearchTerm(term)}/>
      <div className="flex h-full overflow-hidden ">
        <AppSidebar />
        <main className="flex-1 mt-16  overflow-auto  px-4">
        {children &&
            React.cloneElement(children as React.ReactElement, { searchTerm })} 
        </main>
      </div>
    </SidebarProvider>
    
  );
}
