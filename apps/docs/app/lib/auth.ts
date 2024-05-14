import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { OAuthConfig } from 'next-auth/providers/oauth';
import { Account, Profile, Session, TokenSet, User } from "next-auth";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const authOptions: {
  providers: OAuthConfig<GoogleProfile>[];
  callbacks: {
    signIn({ account, profile, email, credentials }: {
      account: Account | null;
      profile?: Profile | undefined;
      email?: { verificationRequest?: boolean | undefined } | undefined;
      credentials?: Record<string, unknown> | undefined;
    }): Promise<boolean>;
    session({ session, token, user }: {
      session: Record<string, any>;
      token: TokenSet;
      user: User;
    }): Promise<Record<string, any>>;
    jwt({ token, account, profile }: {
      token: TokenSet;
      account: Account;
      profile : Profile
    }): Promise<Record<string, any>>;
  };
} = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID || '',
      clientSecret: process.env.CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({
      account,
      profile,
      email,
      credentials,
    }) {
      if (account && account.provider === "google") {
        try {
          if (!profile) {
            throw new Error('Profile is undefined');
          }
    
          const existingUser = await client.user.findUnique({
            where: {
              email: profile.email
            }
          });
    
          if (!existingUser) {
            await client.user.create({
              data: {
                name: profile.name ?? '',
                email: profile.email ?? '',
                image: profile.image ?? ''
              }
            });
          }
    
          return true
        } catch (error) {
          console.error('Error in signIn callback:', error);
          return false; // Return false or handle the error appropriately
        }
      }
    
      return false; // Return false if account is null or account provider is not 'google'
    },
    async session({ session, token, user }) {
      if (session && session.user) {
          session.accessToken = token.accessToken;
          const id = await client.user.findFirst({
              where: {
                  email: session.user.email as string
              },
              select: {
                  id: true
              }
          });
          console.log('id:', id);
          session.user = { ...session.user, id: id?.id };
          // session.user.id = id?.id;
          return session;
      } else {
          return session;
      }
  },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        const id = await client.user.findUnique({
          where:{
            email : profile.email as string
          },
          select:{
             id :true
          }
        })
        token.accessToken = account.access_token
        token.userId = id?.id
        console.log("token " + token);
        
      }
      return token
    }
  }
};

export default authOptions;
