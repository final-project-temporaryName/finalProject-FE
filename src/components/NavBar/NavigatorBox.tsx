'use client';

import '@/styles/tailwind.css';
import Link from 'next/link';
import MessageIcon from '../../../public/assets/icons/message.svg';
import profileImage from '../../../public/assets/images/하니.jpg';
import ProfileImgDropDown from './ProfileImgDropDown';

export default function NavigatorBox() {
  const auth = {
    userName: '하니',
    image: profileImage,
    major: '제품디자인 학부생/3D Modeling',
    isLogin: true,
  };

  return (
    <div className="flex h-40 min-w-170 flex-shrink-0 items-center justify-between gap-40">
      <Link href={'/chatroom'}>
        <MessageIcon />
      </Link>
      {auth.isLogin && <ProfileImgDropDown userName={auth.userName} profileImg={auth.image} major={auth.major} />}
      {auth.isLogin ? (
        // 추후 작품 업로드 Link 수정 예정
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
