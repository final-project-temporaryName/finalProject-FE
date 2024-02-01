'use client';

import { SessionProvider } from 'next-auth/react';

interface GoogleAuthContextProps {
  children: React.ReactNode;
}

function GoogleAuthContext({ children }: GoogleAuthContextProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default GoogleAuthContext;
