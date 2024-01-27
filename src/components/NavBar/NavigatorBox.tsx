'use client';

import '@/styles/tailwind.css';
import Link from 'next/link';
import MessageIcon from '../../../public/assets/icons/message.svg';
import profileImage from '../../../public/assets/images/하니.jpg';
import ProfileImgDropDown from './ProfileImgDropDown';
import { Button } from '../Button';

function NavigatorBox() {
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
        <Button destination="/" style="primary-button nav-upload-button">
          작품 업로드
        </Button>
      ) : (
        <Button destination="/login" style="primary-button nav-login-button">
          로그인
        </Button>
      )}
    </div>
  );
}

export default NavigatorBox;
