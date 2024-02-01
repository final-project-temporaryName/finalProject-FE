import NextAuth from 'next-auth';
import { NextAuthOptions, Account, Profile, Session, DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

interface User {
  id: string;
}

interface ErrorResponse {
  error: string;
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

const handler: NextApiHandler<MyNextAuthOptions | ErrorResponse> = async (
  req: NextApiRequest,
  res: NextApiResponse<MyNextAuthOptions | ErrorResponse>,
) => {
  try {
    const result = await NextAuth(req, res, {
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

    // 핸들러에서 응답을 반환
    return result;
  } catch (error) {
    // 오류가 발생한 경우에도 응답을 반환
    const errorMessage = 'Internal Server Error';
    res.status(500).json({ error: errorMessage });
  }
};

export const GET = handler;
export const POST = handler;
