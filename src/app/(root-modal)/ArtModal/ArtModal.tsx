'use client';

import { useRouter } from 'next/navigation';
import Modal from '../_components';
import { useStore } from '@/store';

export default function ArtModal() {
  const router = useRouter();

  const onClickClose = () => {
    router.back();
  };

  const clickedArtworkId = useStore((state) => state.clickedArtworkId);

  console.log(clickedArtworkId);

  return (
    <Modal.Container onClickClose={onClickClose} classname="modalContainer">
      <Modal.ArtHeader onClickClose={onClickClose} />
      <Modal.Body classname="grid grid-cols-2 h-full"></Modal.Body>
    </Modal.Container>
  );
}
