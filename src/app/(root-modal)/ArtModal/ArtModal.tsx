'use client';

import { getArtwork } from '@/api/artwork/getArtwork';
import CommentContainer from '@/components/Comment/CommentContainer';
import SlideContainer from '@/components/SlideContainer/SlideContainer';
import { useStore } from '@/store';
import DOMPurify from 'dompurify';
import { GetSpecificCardResponseType } from '@/types/cards';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Modal from '../_components';

export default function ArtModal() {
  const [artwork, setArtwork] = useState<GetSpecificCardResponseType>();
  const router = useRouter();

  const onClickClose = () => {
    router.back();
  };

  const clickedArtworkId = useStore((state) => state.clickedArtworkId);

  const getArtworkData = useCallback(async () => {
    const response = await getArtwork(clickedArtworkId);

    setArtwork(response);
  }, [clickedArtworkId]);

  useEffect(() => {
    getArtworkData();
  }, [getArtworkData]);

  return (
    <Modal.Container onClickClose={onClickClose} classname="artModalContainer">
      <Modal.ArtHeader
        onClickClose={onClickClose}
        artistName={artwork?.artistName}
        artistProfileImageUrl={artwork?.artistProfileImageUrl}
        createdAt={artwork?.updatedAt ? artwork?.updatedAt : artwork?.createdAt}
      />
      <Modal.Body classname="h-full overflow-y-scroll">
        <div className="p-10 text-[#8f8f8f]">
          {artwork?.artworkImageResponse?.length && (
            <SlideContainer artworkImageResponse={artwork?.artworkImageResponse} />
          )}
          <div className={`flex flex-col gap-20 p-10 pt-20 ${artwork?.artworkImageResponse.length || `min-h-660`}`}>
            <p>{artwork?.title}</p>
            {artwork?.description && (
              <div
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(artwork?.description) }}
                className={`min-h-65`}
              ></div>
            )}
          </div>
        </div>
        <div className="sticky bottom-0 right-0 z-beforeInfinite">
          <CommentContainer likeCount={1100} commentCount={3} artworkStatus="SELLING" />
        </div>
      </Modal.Body>
    </Modal.Container>
  );
}
