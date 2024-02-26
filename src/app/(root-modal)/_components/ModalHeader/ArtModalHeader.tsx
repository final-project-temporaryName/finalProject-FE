'use client';

import { deleteFollow } from '@/api/follow/deleteFollow';
import { postFollow } from '@/api/follow/postFollow';
import { Button } from '@/components/Button';
import { useStore } from '@/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isNull } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import defaultProfileImg from '../../../../../public/assets/images/logo.png';

interface Props {
  artistName?: string;
  artistProfileImageUrl?: string;
  artistId?: number;
  followId: number | null | undefined;
}

function ArtModalHeader({ artistName, artistProfileImageUrl, artistId, followId }: Props) {
  const [isFollowClicked, setIsFollowClicked] = useState(!isNull(followId));
  const [newFollowId, setNewFollowId] = useState(followId);

  const queryClient = useQueryClient();

  const { modals, hideModal, clickedArtworkId, userId, isLogin } = useStore((state) => ({
    modals: state.modals,
    hideModal: state.hideModal,
    clickedArtworkId: state.clickedArtworkId,
    userId: state.userId,
    isLogin: state.isLogin,
  }));

  const postFollowMutation = useMutation({
    mutationFn: postFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artwork', clickedArtworkId] });
    },
  });

  const deleteFollowMutation = useMutation({
    mutationFn: deleteFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artwork', clickedArtworkId] });
    },
  });

  const handleFollow = () => {
    postFollowMutation.mutate(
      { userId, receiverId: artistId },
      {
        onSuccess: (data: { followId: number }) => {
          setIsFollowClicked(true);
          setNewFollowId(data.followId);
        },
      },
    );
  };

  const handleUnFollow = () => {
    deleteFollowMutation.mutate(
      { userId: artistId, followId: newFollowId },
      {
        onSuccess: () => {
          setIsFollowClicked(false);
          setNewFollowId(null);
        },
      },
    );
  };

  return (
    <div className="relative flex items-center justify-between border-b-1 border-solid border-primary-5 px-34 py-20 text-14">
      <Button.Modal.Close onClickClose={() => hideModal(modals[modals.length - 1])} />
      <div className="flex items-center gap-12">
        <Link href={isLogin && artistId === userId ? '/mypage' : `/artist/${artistId}`}>
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
        {isFollowClicked ? (
          <Button isLink={false} classname="primary-button artModal-follow-button" onClick={() => handleUnFollow()}>
            팔로잉
          </Button>
        ) : (
          <Button isLink={false} classname="primary-button artModal-follow-button" onClick={() => handleFollow()}>
            팔로우
          </Button>
        )}
        {/*  TODO: 추후 destination 바뀔 예정 */}
        <Button isLink={true} destination="/chat" classname="primary-button artModal-chat-button">
          1:1 채팅
        </Button>
      </div>
    </div>
  );
}

export default ArtModalHeader;
