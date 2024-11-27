"use client";

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/sidebar"
import { AppNavbar } from "./components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {

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
