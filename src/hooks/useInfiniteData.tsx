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
  userId?: string;
  categoryType?: '전체' | 'following' | '판매중' | '컬렉션';
}

function useInfiniteData<T, E extends Element>({
  queryKey,
  queryFn,
  getNextPageParam,
  initialPageParam,
  ref,
  userId,
  categoryType,
}: Props<T, E>) {
  // query
  const { data, status, fetchNextPage, isPending, ...rest } = useInfiniteQuery<T, Error, T, string[], number | null>({
    queryKey,
    queryFn: async ({ pageParam }) => {
      if (userId && categoryType) {
        return await queryFn({ categoryType, userId, pageParam });
      } else {
        return await queryFn({ pageParam });
      }
    },
    getNextPageParam,
    initialPageParam,
  });

  const onIntersect = ([entry]: IntersectionObserverEntry[]) => entry.isIntersecting && fetchNextPage();

  useObserver<T>({
    target: ref,
    onIntersect,
  });

  return { data, status, isPending, ...rest };
}

export default useInfiniteData;
