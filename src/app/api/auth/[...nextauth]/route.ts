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
      // 이 라인에 백엔드 서버에 POST 요청을 보낼 함수를 작성하면 됩니다.
      // params?.token?.sub이 unique key 값입니다.
      return params.token;
    },
    async session(params) {
      return params.session;
    },
  },
});

export { handler as GET, handler as POST };
