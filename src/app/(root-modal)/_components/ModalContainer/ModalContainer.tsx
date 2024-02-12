'use client';

import useNotScroll from '@/hooks/useNotScroll';
import '@/styles/tailwind.css';
import { PropsWithChildren } from 'react';

interface Props {
  classname: string;
  onClickClose: () => void;
}

export default function ModalContainer({ onClickClose, classname, children }: PropsWithChildren<Props>) {
  useNotScroll();

  return (
    <div
      className="z-1000 fixed bottom-0 left-0 right-0 top-0 flex h-full w-screen justify-center bg-[#00000066]"
      onClick={onClickClose}
    >
      <div className={`${classname}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
