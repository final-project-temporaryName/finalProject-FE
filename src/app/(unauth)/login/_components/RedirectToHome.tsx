'use client';

import { postUserId } from '@/api/auth/postUserId';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectToHome() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleUserId = async () => {
    await postUserId(session?.user.id);
  };

  useEffect(() => {
    // handleUserId();

    router.replace('/');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
