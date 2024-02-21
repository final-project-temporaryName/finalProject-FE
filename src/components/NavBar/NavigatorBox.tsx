'use client';

import { getMyPage } from '@/api/users/getMyPage';
import { useStore } from '@/store';
import '@/styles/tailwind.css';
import { GetMyPageResponseType, UserType } from '@/types/users';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import ProfileImgFallbackUI from '../FallbackUI/NavBar/ProfileImgFallbackUI';
import MessageIcon from './MessageIcon';
import NavigatorBoxButton from './NavigatorBoxButton';
import ProfileImgDropDown from './ProfileImgDropDown';
import { useCallback, useEffect } from 'react';

function NavigatorBox() {
  const { isLogin, setUserId } = useStore((state) => ({
    isLogin: state.isLogin,
    setUserId: state.setUserId,
  }));

  const { data, isPending, isSuccess } = useQuery<GetMyPageResponseType>({
    queryKey: ['myPageInfo'],
    queryFn: getMyPage,
    enabled: isLogin,
    staleTime: 3 * 1000,
  });
  const userInfo = data?.userProfileResponse as UserType;

  const handleFetch = useCallback(async () => {
    if (isSuccess) setUserId(userInfo?.userId);
  }, [isSuccess]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

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
          isPending={isPending}
        />
      )}
      <NavigatorBoxButton isLogin={isLogin} />
    </div>
  );
}

export default NavigatorBox;
