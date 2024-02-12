import { RefObject, useEffect } from 'react';

/**
 * 드롭다운 밖을 클릭하면 닫히게 만드는 커스텀 훅
 * @param ref container Ref 입력!
 * @param handler 바깥을 클릭했을 때 실행될 함수!
 */

export default function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
) {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('click', listener, true);
    return () => {
      document.removeEventListener('click', listener, true);
    };
  }, [ref, handler]);
}
