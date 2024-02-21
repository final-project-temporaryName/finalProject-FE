'use client';

import { getArtworks } from '@/api/artworks/getArtworks';
import ArtModal from '@/app/(root-modal)/ArtModal/ArtModal';
import useInfiniteData from '@/hooks/useInfiniteData';
import { useStore } from '@/store';
import { CardType } from '@/types/cards';
import { useRef } from 'react';
import Card from './Card';
import EditUploadModal from '@/app/(root-modal)/EditUploadModal/EditUploadModal';
import AskForDeleteModal from '@/app/(root-modal)/AskForDeleteModal/AskForDeleteModal';

interface Props {
  type: 'main' | 'mypage' | 'artist';
}

interface ArtWorks {
  contents: CardType[];
  hasNext: boolean;
  pages: ArtWorks[];
}

function CardContainer({ type }: Props) {
  const bottom = useRef<HTMLDivElement>(null);
  let data;
  let isPending: boolean;

  const modals = useStore((state) => state.modals);

  if (type === 'main') {
    const argument = {
      queryKey: ['allArtworks'],
      queryFn: getArtworks,
      initialPageParam: null,
      getNextPageParam: (lastPage: ArtWorks) => {
        return lastPage.hasNext ? lastPage.contents[lastPage.contents.length - 1].artworkId : undefined;
      },
      ref: bottom,
    };
    const { data: responseData, isPending: pending } = useInfiniteData(argument);
    data = responseData;
    isPending = pending as boolean;
  }

  return (
    <>
      <div
        className={`${data ? (type === 'main' ? 'card-container-mainPage' : 'card-container-artistPage') : 'flex-center mt-25 h-[55vh] w-full'}`}
      >
        {data &&
          data.pages.map((page: ArtWorks) => {
            const cards = page.contents;
            return cards.map((card) => {
              return (
                <Card
                  key={card.artworkId}
                  artworkId={card.artworkId}
                  title={card.title}
                  artworkStatus={card.artworkStatus}
                  likeCount={card.likeCount}
                  viewCount={card.viewCount}
                  commentCount={card.commentCount}
                  thumbnailImageUrl={card.thumbnailImageUrl}
                  artistId={card.artistId}
                  artistName={card.artistName}
                  artistProfileImageUrl={card.artistProfileImageUrl}
                  type={type}
                  isPending={isPending}
                />
              );
            });
          })}
        <div ref={bottom} />
      </div>
      {modals[modals?.length - 1] === 'artModal' && <ArtModal />}
      {modals[modals?.length - 1] === 'editModal' && <EditUploadModal />}
      {modals[modals?.length - 1] === 'askForDelete' && <AskForDeleteModal />}
    </>
  );
}

export default CardContainer;
