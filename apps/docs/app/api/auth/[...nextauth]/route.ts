import GoogleProvider from "next-auth/providers/google"
import NextAuth, { Account, Profile } from "next-auth"
import { PrismaClient, User } from "@prisma/client"
import { AdapterUser } from "next-auth/adapters";
import authOptions  from "../../../lib/auth";
const client = new PrismaClient();
type signIn = {
  user: { id: number; email: string; name: string; image: string; } | AdapterUser;
  account: Account | null;
  profile?: Profile | undefined;
  email?: { verificationRequest?: boolean | undefined } | undefined;
  credentials?: Record<string, unknown> | undefined;
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
