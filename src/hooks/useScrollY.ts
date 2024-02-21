import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export const useScrollY = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  const listener = (mounted: boolean) => {
    if (mounted) {
      setScrollY(window.scrollY);
    }
  };

  const delay = 20;

  useEffect(() => {
    let mounted = true;
    window.addEventListener(
      'scroll',
      debounce(() => listener(mounted), delay),
    );
    return () => {
      mounted = false;
      window.removeEventListener('scroll', () => listener(mounted));
    };
  });

  return { scrollY };
};
