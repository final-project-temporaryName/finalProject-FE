'use client';

import { useRouter } from 'next/navigation';
import Modal from '../_components';
import { useStore } from '@/store';
import CommentContainer from '@/components/Comment/CommentContainer';
import SlideContainer from '@/components/SlideContainer/SlideContainer';

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
      <Modal.Body classname="h-full text-[#8f8f8f] p-10">
        <SlideContainer />
        <div className="flex flex-col gap-20 p-10 pt-20">
          <p>게시글 제목</p>
          <p>게시글 내용</p>
        </div>
      </Modal.Body>
      <CommentContainer likeCount={1100} commentCount={3} artworkStatus="SELLING" />
    </Modal.Container>
  );
}
