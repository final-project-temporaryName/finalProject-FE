'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { MouseEvent } from 'react';
import kakaoLogoImg from '../../../../../public/assets/images/kakaoLogo.png';

function KakaoLoginButton() {
  const { data: session } = useSession();

  const handleKakaoLoginClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (session) {
      // 추후 로그아웃 기능 삭제 예정
      await signOut();
    } else {
      await signIn('kakao', { redirect: true, callbackUrl: '/login/postFlow' });
    }
  };

  return (
    <button
      className="flex-center h-42 w-369 gap-16 rounded-sm border-1 border-solid border-gray-3 bg-[#FDDC3F] hover:bg-[#d6bb35]"
      onClick={handleKakaoLoginClick}
    >
      <Image src={kakaoLogoImg} alt="카카오 로고" width={24} height={24} />
      카카오로 3초만에 입장하기
    </button>
  );
}

export default KakaoLoginButton;
