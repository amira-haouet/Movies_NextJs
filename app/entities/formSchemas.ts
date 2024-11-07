// /schemas/formSchemas.ts
import { z } from "zod";

export const FormSchema = z.object({
    email: z.string().email({ message: "Veuillez entrer une adresse email valide." }),
    password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
});