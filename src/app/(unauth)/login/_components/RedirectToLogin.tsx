'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectToLogin() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/flow/login');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
