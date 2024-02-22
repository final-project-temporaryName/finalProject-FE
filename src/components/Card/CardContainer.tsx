'use client';

import Card from './Card';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useObserver } from '@/hooks/useObserver';
import { useStore } from '@/store';
import { CardType } from '@/types/cards';
import { useRef } from 'react';
import ArtModal from '@/app/(root-modal)/ArtModal/ArtModal';
import EditUploadModal from '@/app/(root-modal)/EditUploadModal/EditUploadModal';
import AskForDeleteModal from '@/app/(root-modal)/AskForDeleteModal/AskForDeleteModal';

interface queryFnProps {
  pageParam?: number | null;
}

interface Props {
  type: 'main' | 'mypage' | 'artist';
  queryKey: string[];
  queryFn: (props: queryFnProps) => Promise<any>;
}

interface ArtWorks {
  contents: CardType[];
  hasNext: boolean;
  pages: ArtWorks[];
}

function CardContainer({ type, queryKey, queryFn }: Props) {
  const { data, status, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery<
    ArtWorks,
    Error,
    ArtWorks,
    string[],
    number | null
  >({
    queryKey: queryKey,
    queryFn: async ({ pageParam }) => {
      return await queryFn({ pageParam });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.contents[lastPage.contents.length - 1].artworkId : undefined;
    },
    initialPageParam: null,
  });

  const modals = useStore((state) => state.modals);

  const bottom = useRef(null);
  const onIntersect = ([entry]: IntersectionObserverEntry[]) => entry.isIntersecting && fetchNextPage();

  useObserver<ArtWorks>({
    target: bottom,
    onIntersect,
  });

  return (
    <>
      <div
        className={`${status === 'success' && data ? (type === 'main' ? 'card-container-mainPage' : 'card-container-artistPage') : 'flex-center mt-25 h-[55vh] w-full'}`}
      >
        {status === 'success' &&
          data &&
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
