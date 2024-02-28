'use client';

import { deleteFollow } from '@/api/follow/deleteFollow';
import { postFollow } from '@/api/follow/postFollow';
import { Button } from '@/components/Button';
import { useStore } from '@/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import defaultProfileImg from '../../../../../public/assets/images/logo.png';

interface Props {
  artistName?: string;
  artistProfileImageUrl?: string;
  artistId?: number;
  followId: number | null | undefined;
}

function ArtModalHeader({ artistName, artistProfileImageUrl, artistId, followId }: Props) {
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
      queryClient.invalidateQueries({ queryKey: ['allFollowingArtworks'] });
    },
  });

  const deleteFollowMutation = useMutation({
    mutationFn: deleteFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artwork', clickedArtworkId] });
      queryClient.invalidateQueries({ queryKey: ['allFollowingArtworks'] });
    },
  });

  const handleFollow = () => {
    postFollowMutation.mutate({ userId, receiverId: artistId });
  };

  const handleUnFollow = () => {
    deleteFollowMutation.mutate({ userId: artistId, followId });
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
        {artistId === userId ||
          (followId ? (
            <Button
              isLink={false}
              classname="group primary-button artModal-following-button relative"
              onClick={handleUnFollow}
            >
              <span className="group-hover:opacity-0">팔로잉</span>
              <span className="absolute left-[50%] top-[50%] w-full translate-x-[-50%] translate-y-[-50%] opacity-0 group-hover:opacity-100">
                언팔로우
              </span>
            </Button>
          ) : (
            <Button isLink={false} classname="primary-button artModal-follow-button" onClick={handleFollow}>
              팔로우
            </Button>
          ))}
        {/*  TODO: 추후 destination 바뀔 예정 */}
        <Button isLink={true} destination="/chat" classname="primary-button artModal-chat-button">
          1:1 채팅
        </Button>
      </div>
    </div>
  );
}

export default ArtModalHeader;
