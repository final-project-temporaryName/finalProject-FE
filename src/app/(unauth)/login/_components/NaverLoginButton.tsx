'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { MouseEvent } from 'react';
import naverLogoImg from '../../../../../public/assets/images/naverLogo.png';
import { useStore } from '@/store';

function NaverLoginButton() {
  const { data: session } = useSession();
  const { setLogin, setLogout } = useStore((state) => ({
    setLogin: state.setLogin,
    setLogout: state.setLogout,
  }));

  const handleNaverLoginClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLogin();

    if (session) {
      // 추후 로그아웃 기능 삭제 예정
      setLogout();
      await signOut();
    } else {
      setLogin();
      await signIn('naver', { redirect: true, callbackUrl: '/login/postFlow' });
    }
  };

  console.log(session);

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
