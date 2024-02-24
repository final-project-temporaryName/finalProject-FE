'use client';

import { deleteFollow } from '@/api/follow/deleteFollow';
import { postFollow } from '@/api/follow/postFollow';
import { Button } from '@/components/Button';
import { useStore } from '@/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import defaultProfileImg from '../../../../../public/assets/images/logo.png';

interface Props {
  artistName?: string;
  artistProfileImageUrl?: string;
  artistId?: number;
}

function ArtModalHeader({ artistName, artistProfileImageUrl, artistId }: Props) {
  const [isFollowClicked, setIsFollowClicked] = useState(false);
  const [followId, setFollowId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const { modals, hideModal, clickedArtworkId } = useStore((state) => ({
    modals: state.modals,
    hideModal: state.hideModal,
    clickedArtworkId: state.clickedArtworkId,
  }));

  const postFollowMutation = useMutation({
    mutationKey: ['artwork', clickedArtworkId],
    mutationFn: postFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artwork', clickedArtworkId] });
    },
  });

  const deleteFollowMutation = useMutation({
    mutationKey: ['artwork', clickedArtworkId],
    mutationFn: deleteFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artwork', clickedArtworkId] });
    },
  });

  const handleFollow = () => {
    postFollowMutation.mutate(
      { userId: artistId },
      {
        onSuccess: (data) => {
          setIsFollowClicked(true);
          setFollowId(data.followId);
        },
      },
    );
  };

  const handleUnFollow = () => {
    if (!followId) return;
    deleteFollowMutation.mutate(
      { userId: artistId, followId },
      {
        onSuccess: () => {
          setIsFollowClicked(false);
          setFollowId(null);
        },
      },
    );
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
