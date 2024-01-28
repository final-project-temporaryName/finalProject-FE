'use client';

import '@/styles/tailwind.css';
import { useRouter } from 'next/navigation';
import Modal from '../_components';

export default function UploadModal() {
  const router = useRouter();

  const onClickClose = () => {
    router.back();
  };

  return (
    <Modal.Container onClickClose={onClickClose} style="loginModalContainer">
      <Modal.Header onClickClose={onClickClose} title="작품을 업로드 하세요." />
      <Modal.Body></Modal.Body>
    </Modal.Container>
  );
}
