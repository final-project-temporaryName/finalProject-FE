'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectToArt() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/flow/art');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
