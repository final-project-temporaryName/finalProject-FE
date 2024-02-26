'use client';

import { getArtistArtworks } from '@/api/artworks/getArtistArtworks';
import { getArtworks } from '@/api/artworks/getArtworks';
import { getMyArtworks } from '@/api/users/getMyArtworks';
import ArtModal from '@/app/(root-modal)/ArtModal/ArtModal';
import AskForDeleteModal from '@/app/(root-modal)/AskForDeleteModal/AskForDeleteModal';
import EditUploadModal from '@/app/(root-modal)/EditUploadModal/EditUploadModal';
import useInfiniteData from '@/hooks/useInfiniteData';
import { useStore } from '@/store';
import { CardType } from '@/types/cards';
import { useParams } from 'next/navigation';
import { useRef } from 'react';
import Card from './Card';
import dynamic from 'next/dynamic';

interface Props {
  type: 'main' | 'mypage' | 'artist' | 'comment';
  categoryType: '전체' | 'following' | '판매중' | '컬렉션';
}

interface ArtWorks {
  contents: CardType[];
  hasNext: boolean;
  pages: ArtWorks[];
}

function CardContainer({ type, categoryType }: Props) {
  const ArtModalWrapper = dynamic(() => import('@/app/(root-modal)/ArtModal/ArtModal'), {
    ssr: false,
  });

  let data;
  let isPending: boolean;

  const bottom = useRef<HTMLDivElement>(null);
  const params = useParams<{ id: string }>();
  const modals = useStore((state) => state.modals);

  if (type === 'main' && categoryType === '전체') {
    const argument = {
      queryKey: ['allArtworks'],
      queryFn: getArtworks,
      initialPageParam: null,
      getNextPageParam: (lastPage: ArtWorks) => {
        return lastPage.hasNext ? lastPage.contents[lastPage.contents.length - 1].artworkId : undefined;
      },
      ref: bottom,
      type: type,
    };
    const { data: responseData, isPending: pending } = useInfiniteData(argument);
    data = responseData;
    isPending = pending as boolean;
  } else if (type === 'artist') {
    const argument = {
      queryKey: ['artistArtworks', params.id, categoryType],
      queryFn: getArtistArtworks,
      initialPageParam: null,
      getNextPageParam: (lastPage: ArtWorks) => {
        return lastPage.hasNext ? lastPage.contents[lastPage.contents.length - 1].artworkId : undefined;
      },
      ref: bottom,
      type: type,
      userId: params.id,
      categoryType: categoryType,
    };
    const { data: responseData, isPending: pending } = useInfiniteData(argument);
    data = responseData;
    isPending = pending as boolean;
  } else if (type === 'mypage') {
    const argument = {
      queryKey: ['myArtworks', categoryType],
      queryFn: getMyArtworks,
      initialPageParam: null,
      getNextPageParam: (lastPage: ArtWorks) => {
        return lastPage.hasNext ? lastPage.contents[lastPage.contents.length - 1].artworkId : undefined;
      },
      ref: bottom,
      type: type,
      categoryType: categoryType,
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
            return cards?.map((card) => {
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
      {modals.includes('editModal') && <EditUploadModal />}
      {modals.includes('artModal') && <ArtModalWrapper />}
      {modals[modals?.length - 1] === 'askForDelete' && <AskForDeleteModal />}
    </>
  );
}

export default CardContainer;
