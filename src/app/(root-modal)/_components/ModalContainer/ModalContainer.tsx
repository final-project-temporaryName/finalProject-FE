'use client';

import useNotScroll from '@/hooks/useNotScroll';
import '@/styles/tailwind.css';
import { PropsWithChildren } from 'react';
import ModalPortal from '../../ModalPortal';
import { useStore } from '@/store';

interface Props {
  classname: string;
}

export default function ModalContainer({ classname, children }: PropsWithChildren<Props>) {
  const { modals, hideModal } = useStore((state) => ({
    modals: state.modals,
    hideModal: state.hideModal,
  }));

  useNotScroll();

  if (!modals.length) {
    return null;
  }

  return (
    <ModalPortal>
      <div
        className="fixed bottom-0 left-0 right-0 top-0 z-infinite flex h-full w-screen justify-center bg-[#00000066]"
        onClick={() => hideModal(modals[modals.length - 1])}
      >
        <div className={`${classname}`} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </ModalPortal>
  );
}
