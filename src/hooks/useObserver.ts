import { RefObject, useEffect } from 'react';

interface UseObserverProps {
  target: RefObject<Element>;
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void;
}

export const useObserver = ({
  target,
  root = null,
  rootMargin = '0px',
  threshold = 1.0,
  onIntersect,
}: UseObserverProps) => {
  useEffect(() => {
    let observer: IntersectionObserver;

    if (target && target.current) {
      observer = new IntersectionObserver(onIntersect, {
        root,
        rootMargin,
        threshold,
      });
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [target, rootMargin, threshold]);
};
