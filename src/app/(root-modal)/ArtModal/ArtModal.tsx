'use client';

import { getArtwork } from '@/api/artwork/getArtwork';
import BlackLike from '@/components/Comment/BlackLike';
import CommentContainer from '@/components/Comment/CommentContainer';
import WhiteLike from '@/components/Comment/WhiteLike';
import SlideContainer from '@/components/SlideContainer/SlideContainer';
import { useStore } from '@/store';
import { GetSpecificCardResponseType } from '@/types/cards';
import { useQuery } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import { useState } from 'react';
import CommentIcon from '../../../../public/assets/icons/comment.svg';
import Modal from '../_components';

export default function ArtModal() {
  const [isLikeClicked, setIsLikeClicked] = useState(false);

  const clickedArtworkId = useStore((state) => state.clickedArtworkId);

  const { data: artwork } = useQuery<GetSpecificCardResponseType>({
    queryKey: ['artwork', clickedArtworkId],
    queryFn: () => getArtwork(clickedArtworkId),
    staleTime: 3 * 1000,
  });

  let customDate;
  if (artwork?.createdAt) {
    const dateResponse = new Date(artwork?.updatedAt ? artwork.updatedAt : artwork.createdAt);
    const year = dateResponse.getFullYear();
    const month = dateResponse.getMonth();
    const date = dateResponse.getDate();

    customDate = `${year}년 ${month + 1}월 ${date}일`;
  }

  const handleLikeClick = () => {
    setIsLikeClicked((prev) => !prev);
    // 좋아요 post api 요청 로직 필요(optimistic update)
  };

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
          <div className="relative flex h-auto px-5 pt-15">
            <div className="flex w-full flex-col gap-20">
              <p className="text-20 font-bold">{artwork?.title}</p>
              {artwork?.description && (
                <div
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(artwork?.description) }}
                  className={'min-h-106 text-16'}
                ></div>
              )}
              <span className="text-13 text-[#8f8f8f]">{customDate}</span>
            </div>
            <div className="sticky top-0 flex flex-col items-end gap-20 pt-5">
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
              <div
                className={`${isLikeClicked ? 'bg-gray-1 shadow-[0px_0px_15px_rgba(0,0,0,0.6)]' : 'bg-white shadow-[0px_0px_12px_rgba(0,0,0,0.3)]'} flex-col-center h-48 w-48 cursor-pointer rounded-full`}
                onClick={handleLikeClick}
              >
                {isLikeClicked ? (
                  <div>
                    <BlackLike />
                  </div>
                ) : (
                  <div className="animate-pulse">
                    <WhiteLike />
                  </div>
                )}
                <p className={'mb-3 text-12'}>
                  {artwork &&
                    (artwork.likeCount < 1000 ? artwork.likeCount : (artwork.likeCount / 1000).toFixed(1) + 'k')}
                </p>
              </div>
            </div>
          </div>
        </div>
        <CommentContainer likeCount={1100} commentCount={3} type={'comment'} />
      </Modal.Body>
    </Modal.Container>
  );
}
