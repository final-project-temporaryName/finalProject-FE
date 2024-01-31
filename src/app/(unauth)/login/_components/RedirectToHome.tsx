'use client';

import { postKakaoUserId } from '@/api/auth/postKakaoUserId';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectToHome() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleKakaoUserId = async () => {
    await postKakaoUserId(session?.user.id);
  };

  useEffect(() => {
    // handleKakaoUserId();

    router.replace('/');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
