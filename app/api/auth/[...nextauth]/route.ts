import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "../../../repository/user";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = User;

        if (credentials?.email === user.UserName) {
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (isValid) {
            return { id: "1", name: user.Name, email: user.UserName };
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt", // Utilisez une valeur autorisée par le type SessionStrategy
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // Assurez-vous que cette clé est définie dans .env
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
