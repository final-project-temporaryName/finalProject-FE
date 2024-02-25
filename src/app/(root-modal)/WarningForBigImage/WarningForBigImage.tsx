'use client';

import { Button } from '@/components/Button';
import { useStore } from '@/store';
import Modal from '../_components';

export default function WarningForBigImage() {
  const hideModal = useStore((state) => state.hideModal);

  return (
    <Modal.Container classname="askForSignupContainer">
      <Modal.Body classname="flex flex-col-center gap-15">
        <div>파일 용량이 너무 큽니다. 🚫</div>
        <Button
          classname="primary-button h-35 w-80 text-white border-primary bg-primary"
          isLink={false}
          onClick={() => hideModal('warningForBigImageModal')}
        >
          확인
        </Button>
      </Modal.Body>
    </Modal.Container>
  );
}
