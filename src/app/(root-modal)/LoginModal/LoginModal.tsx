'use client';

import '@/styles/tailwind.css';
import { useRouter } from 'next/navigation';
import Modal from '../_components';

export default function LoginModal() {
  const router = useRouter();

  const onClickClose = () => {
    router.back();
  };

  return (
    <Modal.Container onClickClose={onClickClose} style="loginModalContainer">
      <Modal.Header onClickClose={onClickClose} title="로그인하세요." />
      <Modal.Body>
        <Modal.Form.Login style="flex flex-1 flex-col" />
      </Modal.Body>
    </Modal.Container>
  );
}
