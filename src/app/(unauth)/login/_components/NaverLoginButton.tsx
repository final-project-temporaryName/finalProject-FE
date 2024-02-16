'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { MouseEvent } from 'react';
import naverLogoImg from '../../../../../public/assets/images/naverLogo.png';
import useIfLogin from '@/hooks/useIfLogin';

function NaverLoginButton() {
  const { data: session } = useSession();
  const { userData } = useIfLogin();

  const handleNaverLoginClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (session) {
      // 추후 로그아웃 기능 삭제 예정
      await signOut();
    } else {
      await signIn('naver', { redirect: true, callbackUrl: '/login/postFlow' });
    }
  };

  console.log(session);
  console.log(userData);

  return (
    <button
      className="flex-center h-42 w-369 gap-16 rounded-sm border-1 border-solid border-gray-3 bg-[#04cf5c] hover:bg-[#2fad66]"
      onClick={handleNaverLoginClick}
    >
      <Image src={naverLogoImg} alt="네이버 로고" width={24} height={24} />
      네이버로 3초만에 입장하기
    </button>
  );
}

export default NaverLoginButton;
