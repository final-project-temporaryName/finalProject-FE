'use client';

import '@/styles/tailwind.css';
import Link from 'next/link';
import MessageIcon from '../../../public/assets/icons/message.svg';
import profileImage from '../../../public/assets/images/하니.jpg';
import { Button } from '../Button';
import ProfileImgDropDown from './ProfileImgDropDown';
import { getUser } from '@/api/users/getUser';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@/api/queryKeys';

interface Links {
  title: string;
  address: string;
  linkId: number;
}

interface UserData {
  nickname: string;
  activityArea: string;
  activityField: string;
  userId: number;
  description: string;
  totalLikeCount: number;
  followerCount: number;
  profileImageUrl?: string;
  links: Links[];
}

function NavigatorBox() {
  const auth = {
    userName: '하니',
    image: profileImage,
    major: '제품디자인 학부생/3D Modeling',
    isLogin: true,
  };

  const id = 2;
  const { data } = useQuery<UserData>({
    queryKey: [QUERY_KEYS.userInfo, id],
    queryFn: () => getUser(id),
  });

  return (
    <div className="flex h-40 min-w-170 flex-shrink-0 items-center justify-between gap-40">
      <Link href={'/chatroom'}>
        <MessageIcon />
      </Link>
      {auth.isLogin && data && (
        <ProfileImgDropDown userName={data.nickname} profileImg={data.profileImageUrl} major={data.activityField} />
      )}
      {auth.isLogin ? (
        // 추후 작품 업로드 Link 수정 예정
        <Button destination="/upload" classname="primary-button nav-upload-button">
          작품 업로드
        </Button>
      ) : (
        <Button destination="/login" classname="primary-button nav-login-button">
          로그인
        </Button>
      )}
    </div>
  );
}

export default NavigatorBox;
