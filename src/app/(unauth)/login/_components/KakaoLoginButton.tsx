'use client';

import Image from 'next/image';
import { MouseEvent } from 'react';
import kakaoLogoImg from '../../../../../public/assets/images/kakaoLogo.png';
import { signIn, signOut, useSession } from 'next-auth/react';

function KakaoLoginButton() {
  const { data: session } = useSession();

  const handleKakaoLoginClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (session) {
      await signOut();
    } else {
      await signIn('kakao', { redirect: true, callbackUrl: '/' });
    }
  };

  console.log(session);

  return (
    <button
      className="flex-center h-42 w-369 gap-16 rounded-sm border-1 border-solid border-gray-3 bg-[#FDDC3F] hover:bg-[#d6bb35]"
      onClick={handleKakaoLoginClick}
    >
      <Image src={kakaoLogoImg} alt="카카오 로고" width={24} height={24} />
      {session ? `${session.user?.email} 로그아웃` : '카카오 아이디로 로그인 하기'}
    </button>
  );
}

export default KakaoLoginButton;
