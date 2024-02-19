'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CheckMyPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const handleRedirect = () => {
    if (!window) return;

    const userAuth = window.localStorage.getItem('store');

    if (userAuth) {
      const {
        state: { isLogin, userRole, userId },
      } = JSON.parse(userAuth);

      if (isLogin === true && userRole === 'REGULAR' && parseInt(params.id) === userId) router.replace('/mypage');
    }
  };

  useEffect(() => {
    handleRedirect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
