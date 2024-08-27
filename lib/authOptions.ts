import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET ?? "",
    }),

    Github({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/signup",
  },

  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
};

export default authOptions;
