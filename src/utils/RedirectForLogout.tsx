'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function RedirectForLogout() {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    router.replace('/');
  }
  return null;
}
