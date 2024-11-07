"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { FormSchema } from "../entities/formSchemas";


interface LoginProps {
    onSubmit: (data: z.infer<typeof FormSchema>) => void;
}

const LoginPage: React.FC<LoginProps> = ({ onSubmit }) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
        <div className="flex min-h-screen">
            <Image
                src="/images/loginImage.png"
                alt="Clapperboard and popcorn"
                width={400}
                height={400}
                className="flex-1 object-cover"
            />

            <div className="flex flex-col flex-1 items-center gap-36 bg-white">
                <Image
                    src="/images/logo.png"
                    alt="Clapperboard and popcorn"
                    width={200}
                    height={200}
                    className='mt-36'
                />

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-80">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Adresse mail</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mot de passe</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Mot de passe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="bg-[#587D92] mt-6">Se connecter</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
