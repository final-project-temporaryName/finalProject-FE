'use client';

import '@/styles/tailwind.css';
import { PropsWithChildren } from 'react';

interface Props {
  style: string;
  onClickClose: () => void;
}

export default function ModalContainer({ onClickClose, style, children }: PropsWithChildren<Props>) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 top-0 flex h-full w-screen justify-center bg-[#00000066]"
      onClick={onClickClose}
    >
      <div className={`${style}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
