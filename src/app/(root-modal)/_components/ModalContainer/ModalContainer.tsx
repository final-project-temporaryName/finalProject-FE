'use client';

import useNotScroll from '@/hooks/useNotScroll';
import '@/styles/tailwind.css';
import { PropsWithChildren } from 'react';
import ModalPortal from '../../ModalPortal';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';

interface Props {
  classname: string;
  type?: string;
}

export default function ModalContainer({ classname, type, children }: PropsWithChildren<Props>) {
  const { modals, hideModal } = useStore((state) => ({
    modals: state.modals,
    hideModal: state.hideModal,
  }));
  const router = useRouter();

  useNotScroll();

  const handleOutsideClick = () => {
    if (type === 'back') {
      hideModal(modals[modals.length - 1]);
      router.replace('/');
    } else hideModal(modals[modals.length - 1]);
  };

  if (!modals.length) {
    return null;
  }

  return (
    <ModalPortal>
      <div
        className="fixed bottom-0 left-0 right-0 top-0 z-infinite flex h-full w-screen justify-center bg-[#00000066]"
        onClick={handleOutsideClick}
      >
        <div className={`${classname}`} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </ModalPortal>
  );
}
