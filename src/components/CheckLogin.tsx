'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CheckLogin() {
  const router = useRouter();

  const handleRedirect = async () => {
    if (!window) return;

    const userAuth = window.localStorage.getItem('store');

    if (!userAuth) router.replace('/login');
    else {
      const {
        state: { userRole },
      } = JSON.parse(userAuth);

      if (!userRole || userRole === 'ASSOCIATE') router.replace('/login');
    }
  };

  useEffect(() => {
    handleRedirect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
