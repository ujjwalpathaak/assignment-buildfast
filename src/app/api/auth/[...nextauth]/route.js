import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: "pcCufgY",
  pages: {
    signIn: "/auth/signin",
    signOut: "/",
    logIn: "/auth/login",
  },
});

export { handler as GET, handler as POST };
