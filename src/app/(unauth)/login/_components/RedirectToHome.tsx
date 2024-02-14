'use client';

import { postUserId } from '@/api/auth/postSocialInfo';
import { useStore } from '@/store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default async function RedirectToHome() {
  const router = useRouter();
  const { data: session } = useSession();

  const { setUserAccessToken, setUserRefreshToken } = useStore((state) => ({
    setUserAccessToken: state.setUserAccessToken,
    setUserRefreshToken: state.setUserRefreshToken,
  }));

  const socialId = session?.user.id;
  const socialType = socialId?.length === 10 ? 'KAKAO' : 'NAVER';

  const handleUserId = async () => {
    try {
      const { accessToken, refreshToken } = await postUserId(socialId, socialType);
      setUserAccessToken(accessToken);
      setUserRefreshToken(refreshToken);
    } finally {
      router.replace('/');
    }
  };

  useEffect(() => {
    if (session) {
      handleUserId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);
  return null;
}
