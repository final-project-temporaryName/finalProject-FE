import NextAuth from 'next-auth';
import { NextAuthOptions, Account, Profile, Session, DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';

interface User {
  id: string;
}

interface MyNextAuthOptions {
  providers: NextAuthOptions['providers'];
  callbacks: {
    jwt: (params: {
      token: JWT;
      user: AdapterUser | User;
      account: Account | null;
      profile?: Profile | undefined;
      trigger?: 'update' | 'signIn' | 'signUp' | undefined;
      isNewUser?: boolean | undefined;
      session?: any;
    }) => Promise<JWT>;
    session: (params: {
      session: Session;
      token: JWT;
      user: AdapterUser | User;
      account: Account | null;
      profile?: Profile | undefined;
      trigger?: 'update' | 'signIn' | 'signUp' | undefined;
      isNewUser?: boolean | undefined;
    }) => Promise<Session | DefaultSession>;
  };
}

const handler: MyNextAuthOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt(params) {
      // console.log(params?.token?.sub);
      return params.token;
    },
    async session(params) {
      return params.session;
    },
  },
});

export { handler as GET, handler as POST };
