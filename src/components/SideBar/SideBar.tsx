'use client';

import { getMyPage } from '@/api/users/getMyPage';
import { Button } from '@/components/Button';
import { useStore } from '@/store';
import '@/styles/tailwind.css';
import { UserType } from '@/types/users';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import defaultProfileImg from '../../../public/assets/images/logo.png';
import ProfileFallbackUI from '../FallbackUI/SideBar/ProfileFallbackUI';
import AddLinkIcon from './AddLinkIcon';
import EditIcon from './EditIcon';
import LinkIcon from './LinkIcon';
import getUser from '@/api/users/getUser';

interface SideBarProps {
  displayStatus: 'myWork' | 'notMyWork';
}

function SideBar({ displayStatus }: SideBarProps) {
  const [userInfo, setUserInfo] = useState<UserType>();
  const params = useParams<{ id: string }>();

  const { isLogin } = useStore((state) => ({
    isLogin: state.isLogin,
  }));

  const handleFetchMyProfile = useCallback(async () => {
    if (displayStatus === 'myWork' && isLogin === true) {
      const { userProfileResponse } = await getMyPage();

      setUserInfo(userProfileResponse);
    } else if (displayStatus === 'notMyWork') {
      const response = await getUser(params.id);

      setUserInfo(response);
    }
  }, [displayStatus, isLogin]);

  useEffect(() => {
    handleFetchMyProfile();
  }, [handleFetchMyProfile]);

  if (typeof isLogin === 'undefined') {
    return <ProfileFallbackUI />;
  }

  return (
    <div className="fixed left-36 top-110 h-648 w-260 rounded-sm">
      <div className="absolute -top-10 left-1/2 z-first h-120 w-120 -translate-x-1/2 transform rounded-full">
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-solid border-gray-4 bg-white hover:border-primary-3">
          <Image
            src={userInfo?.profileImageUrl ? userInfo.profileImageUrl : defaultProfileImg}
            alt="프로필 이미지"
            className="h-full w-full rounded-full object-cover"
            objectFit="cover"
            fill
          />
        </div>
      </div>
      <div className="absolute top-48 flex h-650 w-260 flex-col items-center rounded-[12px] bg-gray-1">
        <div className="mb-276 mt-30 flex h-650 w-192 flex-col items-center justify-center">
          {/* {displayStatus === 'myWork' ? (
            <Link href="/myAccount" className="z-10 absolute right-13 top-15 h-32 w-32 rounded-full">
              <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-solid border-gray-4 bg-white">
                <EditIcon />
              </div>
            </Link>
          ) : null} */}
          <div className="flex-col-center">
            <div className="items-center text-center text-18 font-semibold">{userInfo?.nickname}</div>
            <p className="text-12 text-gray-9">{userInfo?.activityArea + ' / ' + userInfo?.activityField}</p>
          </div>
          <div className="mb-16 mt-16 flex min-h-60 w-192 items-center rounded-sm bg-white p-16">
            <p className="text-12 text-gray-9">{userInfo?.description}</p>
          </div>
          <div className="mb-20 flex items-center justify-between gap-20">
            <span className="count">
              좋아요&nbsp;&nbsp;<span className="text-14 font-bold">{userInfo?.totalLikeCount}</span>&nbsp;개
            </span>
            <div className="h-25 w-2 bg-white"></div>
            <span className="count">
              팔로워 &nbsp;&nbsp;<span className="text-14 font-bold">{userInfo?.followerCount}</span>&nbsp;명
            </span>
          </div>
          {displayStatus === 'notMyWork' ? (
            // 추후 destination 바뀔 예정
            <Button destination="/chat" classname="primary-button nav-chat-button">
              1:1 대화걸기
            </Button>
          ) : null}
          <div className="mb-20 flex flex-col items-start gap-20">
            {userInfo?.links &&
              userInfo.links.map((link) => (
                <Link
                  className=" flex gap-2 text-14 font-semibold"
                  href={link.url}
                  key={link.linkId}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkIcon />
                  {link.url.length > 21
                    ? link.title + ' ' + link.url.slice(0, 21) + '...'
                    : link.title + ' ' + link.url}
                </Link>
              ))}
          </div>
          {displayStatus === 'myWork' ? (
            <Link href="/myAccount" className="flex w-116 items-center gap-4 text-12 text-gray-9">
              <AddLinkIcon />
              {userInfo?.links && userInfo.links.length === 5 ? '링크 수정하기' : '링크 추가하기'}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
