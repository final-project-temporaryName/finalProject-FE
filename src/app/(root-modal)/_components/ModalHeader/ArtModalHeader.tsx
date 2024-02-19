'use client';

import { Button } from '@/components/Button';
import { dateFormat } from '@/utils/date';
import defaultProfileImg from '../../../../../public/assets/images/logo.png';
import { MouseEvent, useState } from 'react';
import Image from 'next/image';

interface Props {
  onClickClose: () => void;
  artistName?: string;
  artistProfileImageUrl?: string;
  createdAt?: string;
}

// TODO: 프로필 이미지 연결하기, 팔로우 api 연결하기
function ArtModalHeader({ onClickClose, artistName, artistProfileImageUrl, createdAt }: Props) {
  const [isFollowClicked, setIsFollowClicked] = useState(false);
  let customDate;

  const handleFollowClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFollowClicked((prev) => !prev);
  };

  if (createdAt) {
    const dateResponse = new Date(createdAt);
    const year = dateResponse.getFullYear();
    const month = dateResponse.getMonth();
    const date = dateResponse.getDate();

    customDate = `${year}년 ${month + 1}월 ${date}일`;
  }

  return (
    <div className="relative flex items-center justify-between border-b-1 border-solid border-primary-5 px-34 py-20 text-14">
      <Button.Modal.Close onClickClose={onClickClose} />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2">
        <div className="text-[#8f8f8f]">{customDate}</div>
      </div>
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-8 pr-5">
          <div className="relative h-32 w-32 overflow-hidden rounded-full">
            <Image
              src={artistProfileImageUrl ? artistProfileImageUrl : defaultProfileImg}
              alt="프로필 이미지"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <p className="text-14 font-semibold">{artistName ? artistName : '닉네임 없음'}</p>
        </div>
        <button onClick={(e) => handleFollowClick(e)} className="primary-button artModal-follow-button">
          {isFollowClicked ? 'Followed' : 'Follow'}
        </button>
        <Button destination="/chat" classname="primary-button artModal-chat-button">
          1:1 채팅
        </Button>
      </div>
    </div>
  );
}

export default ArtModalHeader;
