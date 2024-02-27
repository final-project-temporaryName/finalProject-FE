import { GetNextPageParamFunction, useInfiniteQuery } from '@tanstack/react-query';
import { MutableRefObject } from 'react';
import { useObserver } from './useObserver';

interface queryFnProps {
  categoryType?: '전체' | 'following' | '판매중' | '컬렉션';
  userId?: string;
  pageParam?: number | null;
  artworkId?: number;
  searchWord?: string;
}
interface Props<T, E extends Element> {
  queryKey: string[];
  queryFn: (props: queryFnProps) => Promise<T>;
  initialPageParam: number | null;
  getNextPageParam: GetNextPageParamFunction<number | null, T>;
  ref: MutableRefObject<E | null>;
  type: 'main' | 'mypage' | 'artist' | 'comment' | 'search';
  userId?: string;
  categoryType?: '전체' | 'following' | '판매중' | '컬렉션';
  artworkId?: number;
  searchWord?: string;
}

function useInfiniteData<T, E extends Element>({
  queryKey,
  queryFn,
  getNextPageParam,
  initialPageParam,
  ref,
  type,
  userId,
  categoryType,
  artworkId,
  searchWord,
}: Props<T, E>) {
  // query
  const { data, status, fetchNextPage, isPending, ...rest } = useInfiniteQuery<T, Error, T, string[], number | null>({
    queryKey,
    queryFn: async ({ pageParam }) => {
      if (type === 'artist') {
        return await queryFn({ categoryType, userId, pageParam });
      } else if (type === 'mypage') {
        return await queryFn({ categoryType, pageParam });
      } else if (type === 'main') {
        return await queryFn({ pageParam });
      } else if (type === 'search') {
        return await queryFn({ searchWord, pageParam });
      } else {
        return await queryFn({ artworkId, pageParam });
      }
    },
    getNextPageParam,
    initialPageParam,
    staleTime: 3 * 1000,
  });

  const onIntersect = ([entry]: IntersectionObserverEntry[]) => entry.isIntersecting && fetchNextPage();

  useObserver<T>({
    target: ref,
    onIntersect,
  });

  return { data, status, isPending, ...rest };
}

export default useInfiniteData;
