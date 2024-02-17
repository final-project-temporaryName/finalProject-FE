import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import { RefObject, useEffect } from 'react';

interface UseObserverProps<T> {
  target: RefObject<Element>;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: (
    [entry]: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => false | Promise<InfiniteQueryObserverResult<T, Error>>;
}

export const useObserver = <T>({
  target,
  root = null,
  rootMargin = '0px',
  threshold = 1.0,
  onIntersect,
}: UseObserverProps<T>) => {
  useEffect(() => {
    let observer: IntersectionObserver | undefined;

    if (target && target.current) {
      observer = new IntersectionObserver(
        (entry, observer) => {
          onIntersect(entry, observer);
        },
        {
          root,
          rootMargin,
          threshold,
        },
      );
      observer.observe(target.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [target, rootMargin, threshold]);
};
