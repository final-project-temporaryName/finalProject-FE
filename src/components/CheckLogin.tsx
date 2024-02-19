'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CheckLogin() {
  const router = useRouter();

  const handleRedirect = () => {
    if (!window) return;

    const userAuth = window.localStorage.getItem('store');

    if (!userAuth) {
      router.replace('/');
    } else {
      const {
        state: { isLogin, userRole },
      } = JSON.parse(userAuth);

      if (isLogin === false || userRole === '' || userRole === 'ASSOCIATE') router.replace('/');
    }
  };

  useEffect(() => {
    handleRedirect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
