'use client';

import CommentContainer from '@/components/Comment/CommentContainer';
import SlideContainer from '@/components/SlideContainer/SlideContainer';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import Modal from '../_components';

export default function ArtModal() {
  const router = useRouter();

  const onClickClose = () => {
    router.back();
  };

  const clickedArtworkId = useStore((state) => state.clickedArtworkId);

  const imageUrlList = [
    'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1707305318944-0dd559c12789?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];
  return (
    <Modal.Container onClickClose={onClickClose} classname="artModalContainer">
      <Modal.ArtHeader onClickClose={onClickClose} />
      <Modal.Body classname="flex flex-col overflow-y-scroll">
        <div className="p-10 text-[#8f8f8f]">
          <SlideContainer imageUrlList={imageUrlList} />
          <div className="flex flex-col gap-20 p-10 pt-20">
            <p>게시글 제목</p>
            <p>게시글 내용</p>
            <p>게시글 내용</p>
            <p>게시글 내용</p>
            <p>게시글 내용</p>
            <p>게시글 내용</p>
            <p>게시글 내용</p>
          </div>
        </div>
        <div className="sticky bottom-0 right-0 z-beforeInfinite">
          <CommentContainer likeCount={1100} commentCount={3} artworkStatus="SELLING" />
        </div>
      </Modal.Body>
    </Modal.Container>
  );
}
