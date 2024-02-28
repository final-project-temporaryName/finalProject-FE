'use client';

import { Button } from '@/components/Button';
import { useStore } from '@/store';
import Modal from '../_components';

export default function AskForLoginModal() {
  const clearModal = useStore((state) => state.clearModal);

  return (
    <Modal.Container type={'back'} classname="askForSignupContainer">
      <Modal.Body classname="flex flex-col-center gap-15">
        <div>로그인 후 이용해주세요🎨</div>
        <Button
          classname="primary-button h-35 w-80 text-white border-primary bg-primary"
          destination="/login"
          isLink={true}
          onClick={clearModal}
        >
          확인
        </Button>
      </Modal.Body>
    </Modal.Container>
  );
}
