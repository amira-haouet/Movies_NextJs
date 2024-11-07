"use client"
import { FormSchema } from "./entities/formSchemas";
import { LoginLayout } from "./login/page";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { User } from "./repository/user";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";


export default function Home() {
  const handleLogin = async (data: z.infer<typeof FormSchema>) => {
    const { email, password } = data;

    if (email === User.UserName) {
        const isValid = await bcrypt.compare(password, User.password);
        if (isValid) {
            console.log("Login successful");
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
    <LoginLayout onSubmit={handleLogin} />
);
}