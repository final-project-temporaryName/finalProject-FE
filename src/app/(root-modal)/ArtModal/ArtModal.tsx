'use client';

import { getArtwork } from '@/api/artwork/getArtwork';
import { deleteLike } from '@/api/like/deleteLike';
import { postLike } from '@/api/like/postLike';
import BlackLike from '@/components/Comment/BlackLike';
import CommentContainer from '@/components/Comment/CommentContainer';
import RedLike from '@/components/Comment/RedLike';
import SlideContainer from '@/components/SlideContainer/SlideContainer';
import useDropDown from '@/hooks/useDropDown';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useStore } from '@/store';
import { GetSpecificCardResponseType } from '@/types/cards';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import { MouseEvent, useRef, useEffect, useState } from 'react';
import ProfileDropDownImage from '../../../../public/assets/icons/KebabDropDown.svg';
import CommentIcon from '../../../../public/assets/icons/comment.svg';
import MenuIcon from '../../../../public/assets/icons/menu.svg';
import Modal from '../_components';

export default function ArtModal() {
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { isOpen: isDropDownOpen, handleDropDownOpen, handleDropDownClose } = useDropDown();
  useOnClickOutside(containerRef, handleDropDownClose);

  const { clickedArtworkId, userId, showModal, setClickedArtworkId } = useStore((state) => ({
    clickedArtworkId: state.clickedArtworkId,
    userId: state.userId,
    showModal: state.showModal,
    setClickedArtworkId: state.setClickedArtworkId,
  }));

  const { data: artwork } = useQuery<GetSpecificCardResponseType>({
    queryKey: ['artwork', clickedArtworkId],
    queryFn: () => getArtwork(clickedArtworkId),
    staleTime: 3 * 1000,
  });

  const [likeCount, setLikeCount] = useState(artwork?.likeCount || 0);
  const [likeId, setLikeId] = useState<number | null>(artwork?.likeId || null);

  const queryClient = useQueryClient();

  const postLikeMutation = useMutation({
    mutationKey: ['artwork'],
    mutationFn: postLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artwork', clickedArtworkId] });
    },
  });

  const deleteLikeMutation = useMutation({
    mutationKey: ['artwork'],
    mutationFn: deleteLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artwork', clickedArtworkId] });
    },
  });

  let customDate;
  if (artwork?.createdAt) {
    const dateResponse = new Date(artwork?.updatedAt ? artwork.updatedAt : artwork.createdAt);
    const year = dateResponse.getFullYear();
    const month = dateResponse.getMonth();
    const date = dateResponse.getDate();

    customDate = `${year}년 ${month + 1}월 ${date}일`;
  }

  const handleLikeClick = async () => {
    setIsLikeClicked((prev) => !prev);
    postLikeMutation.mutate(
      { artworkId: clickedArtworkId },
      {
        onSuccess: (data) => {
          setLikeCount((prev) => prev + 1);
          setLikeId(data.likeId);
        },
      },
    );
  };

  const handleUnLikeClick = () => {
    setIsLikeClicked((prev) => !prev);
    deleteLikeMutation.mutate(
      { artworkId: clickedArtworkId, likeId: likeId },
      {
        onSuccess: () => {
          setLikeCount((prev) => prev - 1);
          setLikeId(null);
        },
      },
    );
  };

  const handleKebabClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isDropDownOpen) handleDropDownClose();
    else handleDropDownOpen();
  };

  const handleModifyClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (artwork?.artworkId) {
      setClickedArtworkId(artwork?.artworkId);
      showModal('editModal');
    }
  };

  const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (artwork?.artworkId) {
      showModal('askForDelete');
      setClickedArtworkId(artwork?.artworkId);
    }
  };
  // likeId 있을 때 좋아요 색을 빨간 색으로 바꿔준다.
  useEffect(() => {
    if (!likeId) return;
    setIsLikeClicked(true);
  }, [likeId]);

  return (
    <Modal.Container classname="artModalContainer">
      <Modal.ArtHeader
        artistName={artwork?.artistName}
        artistProfileImageUrl={artwork?.artistProfileImageUrl}
        artistId={artwork?.artistId}
      />
      <Modal.Body classname="h-full overflow-y-scroll">
        <a id="upwards"></a>
        <div className="mb-20 p-10">
          {artwork?.artworkImageResponse?.length && (
            <SlideContainer artworkImageResponse={artwork?.artworkImageResponse} />
          )}
          <div className="relative flex h-auto px-20 pt-30">
            <div className="flex w-full flex-col gap-25">
              <p className="text-20 font-bold">{artwork?.title}</p>
              {artwork?.description && (
                <div
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(artwork?.description) }}
                  className={'min-h-106 text-16'}
                ></div>
              )}
              <span className="text-13 text-[#8f8f8f]">{customDate}</span>
            </div>
            <div className="sticky top-0 flex flex-col items-end gap-20 pl-32 pt-5">
              {isLikeClicked ? (
                <div
                  className={
                    'flex-col-center h-48 w-48 cursor-pointer rounded-full bg-gray-1 shadow-[0px_0px_15px_rgba(0,0,0,0.6)]'
                  }
                  onClick={handleUnLikeClick}
                >
                  <div>
                    <RedLike />
                  </div>
                  <p className={'mb-3 text-12 text-primary'}>
                    {artwork && (likeCount < 1000 ? likeCount : (likeCount / 1000).toFixed(1) + 'k')}
                  </p>
                </div>
              ) : (
                <div
                  className={
                    'flex-col-center h-48 w-48 cursor-pointer rounded-full bg-white shadow-[0px_0px_12px_rgba(0,0,0,0.3)]'
                  }
                  onClick={handleLikeClick}
                >
                  <div className="animate-pulse">
                    <BlackLike />
                  </div>
                  <p className={'mb-3 text-12'}>
                    {artwork && (likeCount < 1000 ? likeCount : (likeCount / 1000).toFixed(1) + 'k')}
                  </p>
                </div>
              )}
              {/* 댓글 버튼 */}
              <Link
                href="#downwards"
                className="flex-col-center h-48 w-48 rounded-full shadow-[0px_0px_12px_rgba(0,0,0,0.3)]"
              >
                <div className="animate-pulse">
                  <CommentIcon />
                </div>
                <span className="text-12">
                  {artwork &&
                    (artwork.commentCount < 1000
                      ? artwork.commentCount
                      : (artwork.commentCount / 1000).toFixed(1) + 'k')}
                </span>
              </Link>
              {artwork?.artistId === userId && (
                <div className="relative" ref={containerRef}>
                  <div
                    className="flex-col-center h-48 w-48 cursor-pointer rounded-full shadow-[0px_0px_12px_rgba(0,0,0,0.3)]"
                    onClick={handleKebabClick}
                  >
                    <MenuIcon />
                  </div>
                  {isDropDownOpen && (
                    <div className="absolute -left-100 -top-25">
                      <div className="rotate-90">
                        <ProfileDropDownImage />
                      </div>
                      <div className="absolute -left-21 top-25 flex h-61 w-105 rounded-sm">
                        <button
                          className="w-51 rounded-bl-sm rounded-tl-sm hover:bg-primary-1"
                          onClick={handleModifyClick}
                        >
                          수정
                        </button>
                        <button
                          className="w-52 rounded-br-sm rounded-tr-sm border-l-1 border-solid border-l-gray-4 hover:bg-primary-1"
                          onClick={handleDeleteClick}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <CommentContainer likeCount={1100} commentCount={3} type={'comment'} />
      </Modal.Body>
    </Modal.Container>
  );
}
