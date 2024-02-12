'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { Session } from 'next-auth';

interface Props {
  session?: Session | null;
  children: ReactNode;
}

export function AuthSession({ session, children }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
