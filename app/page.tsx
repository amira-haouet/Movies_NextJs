"use client"
import { useState } from "react";
import { FormSchema } from "./entities/formSchemas";
import { LoginLayout } from "./login/loginLayout";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { User } from "./repository/user";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  const handleLogin = async (data: z.infer<typeof FormSchema>) => {
    const { email, password } = data;

    if (email === User.UserName) {
      const isValid = await bcrypt.compare(password, User.password);
      if (isValid) {
        setIsLogged(true);
        localStorage.setItem("user", "true");
        router.push("/auth");
      } else {
        showInvalidLoginToast();
      }
    } else {
      showInvalidLoginToast();
    }
  };

  const showInvalidLoginToast = () => {
    toast({
      variant: "destructive",
      title: "Oups ! Une erreur est survenue.",
      description: "Les coordonnées que vous avez fournies sont incorrectes.",
      action: <ToastAction altText="Réessayer">Réessayer</ToastAction>,
    });
  };

  return (
    <>
      {isLogged ? (<p>En cours de développement... </p>) : ( <LoginLayout onSubmit={handleLogin} /> )}
    </>
  );}
