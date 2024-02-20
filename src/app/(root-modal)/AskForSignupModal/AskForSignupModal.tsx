'use client';

import { Button } from '@/components/Button';
import Modal from '../_components';
import { useStore } from '@/store';

export default function AskForSignupModal() {
  const clearModal = useStore((state) => state.clearModal);

  return (
    <Modal.Container classname="askForSignupContainer">
      <Modal.Body classname="flex flex-col-center gap-15">
        <div>내 정보 입력 후 회원가입을 완료하세요🎨</div>
        <Button
          classname="primary-button h-35 w-80 text-white border-primary bg-primary"
          destination="/signup"
          isLink={true}
          onClick={clearModal}
        >
          확인
        </Button>
      </Modal.Body>
    </Modal.Container>
  );
}
