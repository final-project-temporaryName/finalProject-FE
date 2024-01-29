'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectToUpload() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/flow/upload');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
