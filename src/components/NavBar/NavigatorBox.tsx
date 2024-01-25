'use client';

import '@/styles/tailwind.css';
import Image from 'next/image';
import Link from 'next/link';
import MessageIcon from '../../../public/assets/icons/message.svg';
import profileImage from '../../../public/assets/images/하니.jpg';

export default function NavigatorBox() {
  const auth = {
    userName: '하니',
    image: profileImage,
    isLogin: false,
  };

  return (
    <div className="flex h-40 w-253 items-center gap-40">
      <Link href={'/chatroom'}>
        <MessageIcon />
      </Link>
      <Image
        src={auth.image}
        alt="프로필 이미지"
        width={32}
        height={32}
        style={{ borderRadius: '50%', cursor: 'pointer' }}
      />
      {auth.isLogin ? (
        <Link href={'/'}>
          <button className="navigatorBoxBtn border-1 border-solid border-primary bg-white text-black hover:bg-primary-1">
            작품 업로드
          </button>
        </Link>
      ) : (
        <Link href={'/login'}>
          <button className="navigatorBoxBtn bg-primary text-white hover:bg-primary-7">로그인</button>
        </Link>
      )}
    </div>
  );
}
