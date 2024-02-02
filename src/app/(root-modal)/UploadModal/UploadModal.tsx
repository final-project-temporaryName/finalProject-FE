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
    <Modal.Container onClickClose={onClickClose} classname="loginModalContainer">
      <Modal.Header onClickClose={onClickClose} />
      <Modal.Body></Modal.Body>
    </Modal.Container>
  );
}
