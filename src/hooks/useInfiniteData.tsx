import { GetNextPageParamFunction, useInfiniteQuery } from '@tanstack/react-query';
import { MutableRefObject } from 'react';
import { useObserver } from './useObserver';

interface queryFnProps {
  categoryType?: '전체' | 'following' | '판매중' | '컬렉션';
  userId?: string;
  pageParam?: number | null;
}
interface Props<T, E extends Element> {
  queryKey: string[];
  queryFn: (props: queryFnProps) => Promise<T>;
  initialPageParam: number | null;
  getNextPageParam: GetNextPageParamFunction<number | null, T>;
  ref: MutableRefObject<E | null>;
  type: 'main' | 'mypage' | 'artist';
  userId?: string;
  categoryType?: '전체' | 'following' | '판매중' | '컬렉션';
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
}: Props<T, E>) {
  // query
  const { data, status, fetchNextPage, isPending, ...rest } = useInfiniteQuery<T, Error, T, string[], number | null>({
    queryKey,
    queryFn: async ({ pageParam }) => {
      if (type === 'artist') {
        return await queryFn({ categoryType, userId, pageParam });
      } else if (type === 'mypage') {
        return await queryFn({ categoryType, pageParam });
      } else {
        return await queryFn({ pageParam });
      }
    },
    getNextPageParam,
    initialPageParam,
    // staleTime: 3 * 1000, 캐싱을 할까?
  });

  const onIntersect = ([entry]: IntersectionObserverEntry[]) => entry.isIntersecting && fetchNextPage();

  useObserver<T>({
    target: ref,
    onIntersect,
  });

  return { data, status, isPending, ...rest };
}

export default useInfiniteData;
