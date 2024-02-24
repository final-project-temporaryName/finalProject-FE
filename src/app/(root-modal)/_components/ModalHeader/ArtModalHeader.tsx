'use client';

import { Button } from '@/components/Button';
import { useStore } from '@/store';
import Image from 'next/image';
import { MouseEvent, useState } from 'react';
import defaultProfileImg from '../../../../../public/assets/images/logo.png';
import Link from 'next/link';

interface Props {
  artistName?: string;
  artistProfileImageUrl?: string;
  artistId?: number;
}

function ArtModalHeader({ artistName, artistProfileImageUrl, artistId }: Props) {
  const [isFollowClicked, setIsFollowClicked] = useState(false);
  const { modals, hideModal } = useStore((state) => ({
    modals: state.modals,
    hideModal: state.hideModal,
  }));

  const handleFollow = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFollowClicked((prev) => !prev);
  };

  return (
    <div className="relative flex items-center justify-between border-b-1 border-solid border-primary-5 px-34 py-20 text-14">
      <Button.Modal.Close onClickClose={() => hideModal(modals[modals.length - 1])} />
      <div className="flex items-center gap-12">
        <Link href={`/artist/${artistId}`}>
          <div className="flex items-center gap-8 pr-5" onClick={() => hideModal(modals[modals.length - 1])}>
            <div className="relative h-32 w-32 overflow-hidden rounded-full">
              <Image
                src={artistProfileImageUrl ? artistProfileImageUrl : defaultProfileImg}
                alt="프로필 이미지"
                fill
                objectFit="cover"
              />
            </div>
            <p className="text-14 font-semibold">{artistName ? artistName : '닉네임 없음'}</p>
          </div>
        </Link>
        <button onClick={(e) => handleFollow(e)} className="primary-button artModal-follow-button">
          {isFollowClicked ? '팔로잉' : '팔로우'}
        </button>
        {/*  TODO: 추후 destination 바뀔 예정 */}
        <Button isLink={true} destination="/chat" classname="primary-button artModal-chat-button">
          1:1 채팅
        </Button>
      </div>
    </div>
  );
}

export default ArtModalHeader;
