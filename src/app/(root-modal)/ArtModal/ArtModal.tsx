'use client';

import { useRouter } from 'next/navigation';
import Modal from '../_components';
import { useStore } from '@/store';
import CommentContainer from '@/components/Comment/CommentContainer';

export default function ArtModal() {
  const router = useRouter();

  const onClickClose = () => {
    router.back();
  };

  const clickedArtworkId = useStore((state) => state.clickedArtworkId);

  console.log(clickedArtworkId);

  return (
    <Modal.Container onClickClose={onClickClose} classname="artModalContainer">
      <Modal.ArtHeader onClickClose={onClickClose} />
      <Modal.Body classname="h-full">
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
      </Modal.Body>
      <CommentContainer likeCount={1100} commentCount={3} artworkStatus="SELLING" />
    </Modal.Container>
  );
}
