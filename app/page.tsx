"use client"
import { FormSchema } from "./entities/formSchemas";
import { LoginLayout } from "./login/page";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { User } from "./repository/user";


export default function Home() {
  const handleLogin = async (data: z.infer<typeof FormSchema>) => {
    const { email, password } = data;

    if (email === User.UserName) {
        const isValid = await bcrypt.compare(password, User.password);
        if (isValid) {
            console.log("Login successful");
        } else {
            console.log("Invalid login credentials");
        }
    } else {
        console.log("Invalid login credentials");
    }
};

return (
    <LoginLayout onSubmit={handleLogin} />
);
}