'use client';

import { getMyPage } from '@/api/users/getMyPage';
import { useStore } from '@/store';
import '@/styles/tailwind.css';
import { UserType } from '@/types/users';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import MessageIcon from './MessageIcon';
import NavigatorBoxButton from './NavigatorBoxButton';
import ProfileImgDropDown from './ProfileImgDropDown';

function NavigatorBox() {
  const [userInfo, setUserInfo] = useState<UserType>();
  const isLogin = useStore((state) => state.isLogin);
  const setUserId = useStore((state) => state.setUserId);

  const handleFetchMyProfile = useCallback(async () => {
    if (!isLogin) return;

    const { userProfileResponse } = await getMyPage();

    setUserInfo(userProfileResponse);
    setUserId(userProfileResponse.userId);
  }, [isLogin]);

  useEffect(() => {
    handleFetchMyProfile();
  }, [handleFetchMyProfile]);

  return (
    <div className="flex h-40 min-w-170 flex-shrink-0 items-center justify-between gap-40">
      <Link href={'/chatroom'}>
        <MessageIcon />
      </Link>
      {isLogin && (
        <ProfileImgDropDown
          userName={userInfo?.nickname}
          profileImg={userInfo?.profileImageUrl}
          major={userInfo?.activityField}
        />
      )}
      <NavigatorBoxButton isLogin={isLogin} />
    </div>
  );
}

export default NavigatorBox;
