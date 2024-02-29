'use client';

import useDropDown from '@/hooks/useDropDown';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import removeStore from '@/utils/removeStore';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import defaultProfileImg from '../../../public/assets/images/logo.png';
import ProfileDropDownImg from '../../../public/assets/images/profileDropDown.svg';
import { Button } from '../Button';
import { useStore } from '@/store';
import ProfileImgFallbackUI from '../FallbackUI/NavBar/ProfileImgFallbackUI';
import { useBrowserSize } from '@/hooks/useBrowserSize';
import SettingIcon from '../SvgComponents/SettingIcon';
import QAIcon from '../SvgComponents/QAIcon';
import LogoutIcon from '../SvgComponents/LogoutIcon';

interface ProfileImgDropDownProps {
  userName?: string;
  profileImg?: string;
  major?: string;
  isPending?: boolean;
}

function ProfileImgDropDown({ userName, profileImg, major, isPending }: ProfileImgDropDownProps) {
  const { isOpen: isDropDownOpen, handleDropDownOpen, handleDropDownClose } = useDropDown();
  const setLogout = useStore((state) => state.setLogout);

  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { isMobile } = useBrowserSize();
  useOnClickOutside(containerRef, handleDropDownClose);

  const handleContainerClick = () => {
    if (isDropDownOpen) handleDropDownClose();
    else handleDropDownOpen();
  };

  const handleLogoutClick = async () => {
    setLogout();
    await signOut();
    removeStore();
    router.push('/');
  };

  if (isPending) {
    return <ProfileImgFallbackUI />;
  }

  return (
    <div className="relative flex-shrink-0" ref={containerRef} onClick={handleContainerClick}>
      <div className="relative h-32 w-32 cursor-pointer overflow-hidden rounded-full">
        <Image src={profileImg ? profileImg : defaultProfileImg} alt="프로필 이미지" fill objectFit="cover" />
      </div>
      {isDropDownOpen &&
        (isMobile ? (
          <div className="fixed inset-0 z-infinite flex h-screen w-full items-start justify-center bg-[#0000007e]">
            <div
              className="flex h-305 w-full items-center justify-center bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute left-0 top-0 flex h-310 w-266 flex-col rounded-sm">
                <div className="flex w-screen flex-col items-stretch justify-between gap-16 px-10 py-20 ">
                  <div className="flex items-center gap-30">
                    <div className="relative h-60 w-60 overflow-hidden rounded-full">
                      <Image
                        src={profileImg ? profileImg : defaultProfileImg}
                        alt="프로필 이미지"
                        fill
                        objectFit="cover"
                      />
                    </div>
                    <div>
                      <p className="text-18 font-semibold">{userName}</p>
                      <p className="pl-1 text-12 text-gray-5">{major}</p>
                    </div>
                  </div>
                  <Button isLink={true} destination="/mypage" classname="primary-button dropdown-mypage-button">
                    마이페이지
                  </Button>
                </div>
                <div className="flex h-100 w-screen flex-col border-t-1 border-solid border-t-gray-4">
                  <Link href={'/myAccount'}>
                    <div
                      className="flex h-50 items-center justify-center gap-10 px-18 hover:bg-gray-1"
                      onClick={handleDropDownClose}
                    >
                      <SettingIcon /> 계정관리
                    </div>
                  </Link>
                  {/* 추후 Link 변경 예정 */}
                  <Link href={'/'}>
                    <div className="flex h-50 items-center justify-center gap-10 px-18 hover:bg-gray-1">
                      <QAIcon />
                      문의하기
                    </div>
                  </Link>
                </div>
                <div className="h-50 w-screen cursor-pointer">
                  <div
                    onClick={handleLogoutClick}
                    className="flex h-50 w-full items-center justify-center gap-10  border-t-1 border-solid border-t-gray-4 hover:bg-primary-1"
                  >
                    <LogoutIcon />
                    로그아웃
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute right-[-160px] top-40" onClick={(e) => e.stopPropagation()}>
            <ProfileDropDownImg />
            <div className="absolute left-2 top-14 flex h-310 w-266 flex-col rounded-sm">
              <div className="flex w-full flex-1 flex-col items-stretch justify-between gap-13 px-17 py-23">
                <div className="flex items-center gap-30">
                  <div className="relative h-60 w-60 overflow-hidden rounded-full">
                    <Image
                      src={profileImg ? profileImg : defaultProfileImg}
                      alt="프로필 이미지"
                      fill
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <p className="text-18 font-semibold">{userName}</p>
                    <p className="pl-1 text-12 text-gray-5">{major}</p>
                  </div>
                </div>
                <Button isLink={true} destination="/mypage" classname="primary-button dropdown-mypage-button">
                  마이페이지
                </Button>
              </div>
              <div className="flex h-100 w-full flex-col border-t-1 border-solid border-t-gray-4">
                <Link href={'/myAccount'}>
                  <div className="flex h-50 items-center px-18 hover:bg-gray-1">계정관리</div>
                </Link>
                {/* 추후 Link 변경 예정 */}
                <Link href={'/'}>
                  <div className="flex h-50 items-center px-18 hover:bg-gray-1">문의하기</div>
                </Link>
              </div>
              <div className="h-50 w-full cursor-pointer">
                <div
                  onClick={handleLogoutClick}
                  className="flex h-50 w-full items-center rounded-b-[12px] border-t-1 border-solid border-t-gray-4 px-18 hover:bg-primary-1"
                >
                  로그아웃
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ProfileImgDropDown;
