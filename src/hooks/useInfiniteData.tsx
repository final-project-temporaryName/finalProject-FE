import { GetNextPageParamFunction, useInfiniteQuery } from '@tanstack/react-query';
import { MutableRefObject } from 'react';
import { useObserver } from './useObserver';

interface queryFnProps {
  pageParam?: number | null;
}

interface Props<T, E extends Element> {
  queryKey: string[];
  queryFn: (props: queryFnProps) => Promise<T>;
  initialPageParam: number | null;
  getNextPageParam: GetNextPageParamFunction<number | null, T>;
  ref: MutableRefObject<E | null>;
}

function useInfiniteData<T, E extends Element>({
  queryKey,
  queryFn,
  getNextPageParam,
  initialPageParam,
  ref,
}: Props<T, E>) {
  // query
  const { data, status, fetchNextPage, ...rest } = useInfiniteQuery<T, Error, T, string[], number | null>({
    queryKey,
    queryFn: async ({ pageParam }) => {
      return await queryFn({ pageParam });
    },
    getNextPageParam,
    initialPageParam,
  });

  const onIntersect = ([entry]: IntersectionObserverEntry[]) => entry.isIntersecting && fetchNextPage();

  useObserver<T>({
    target: ref,
    onIntersect,
  });

  return { data, status, ...rest };
}

export default useInfiniteData;
