'use client';

import useDropDown from '@/hooks/useDropDown';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import Image, { StaticImageData } from 'next/image';
import { useRef } from 'react';
import ProfileDropDownImg from '../../../public/assets/images/profileDropDown.svg';
import Link from 'next/link';
import { Button } from '../button';

interface Props {
  userName: string;
  profileImg: string | StaticImageData; // StaticImageData 타입은 추후 서버 연결되면 삭제 예정
  major: string;
}

export default function ProfileImgDropDown({ userName, profileImg, major }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isOpen: isDropDownOpen, handleDropDownOpen, handleDropDownClose } = useDropDown();

  useOnClickOutside(containerRef, handleDropDownClose);

  const handleContainerClick = () => {
    if (isDropDownOpen) handleDropDownClose();
    else handleDropDownOpen();
  };

  return (
    <div className="relative flex-shrink-0" ref={containerRef} onClick={handleContainerClick}>
      {/* 추후 프로필 이미지 없을 시, 띄울 이미지 생기면 이미지 추가하기 */}
      <Image
        src={profileImg}
        alt="프로필 이미지"
        width={32}
        height={32}
        style={{ borderRadius: '50%', cursor: 'pointer' }}
      />
      {isDropDownOpen && (
        <div className="absolute right-[-160px] top-40" onClick={(e) => e.stopPropagation()}>
          <ProfileDropDownImg />
          <div className="absolute top-14 flex h-310 w-268 flex-col rounded-sm">
            <div className="flex w-full flex-1 flex-col items-stretch justify-between gap-13 px-17 py-23">
              <div className="flex items-center justify-between">
                <Image
                  src={profileImg}
                  alt="프로필 이미지"
                  width={60}
                  height={60}
                  style={{ borderRadius: '50%', cursor: 'pointer' }}
                />
                <div>
                  <p className="font-semibold text-18">{userName}</p>
                  <p className="text-12 text-gray-5">{major}</p>
                </div>
              </div>
              {/* 추후 Link 변경 예정 */}
              <Button destination="/" style="primary-button dropdown-mypage-button">
                마이페이지
              </Button>
            </div>
            <div className="flex h-100 w-full flex-col border-y-1 border-solid border-y-gray-4">
              {/* 추후 Link 변경 예정 */}
              <Link href={'/'}>
                <div className="flex h-50 items-center px-18">계정관리</div>
              </Link>
              {/* 추후 Link 변경 예정 */}
              <Link href={'/'}>
                <div className="flex h-50 items-center px-18">문의하기</div>
              </Link>
            </div>
            <div className="h-50 w-full">
              {/* 추후 Link 변경 예정 */}
              <Link href={'/'}>
                <div className="flex h-50 w-full items-center px-18">로그아웃</div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
