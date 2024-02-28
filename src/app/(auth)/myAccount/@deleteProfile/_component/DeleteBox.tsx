'use client';

import WithdrawalModal from '@/app/(root-modal)/WithdrawalModal/WithdrawalModal';
import { Button } from '@/components/Button';
import { useStore } from '@/store';

function DeleteBox() {
  const { modals, showModal } = useStore((state) => ({
    modals: state.modals,
    showModal: state.showModal,
  }));

  return (
    <div className="mt-200 flex h-152 w-auto gap-58 pl-150 md:mt-50 md:pl-0 md:gap-30">
      <span className="text-18 ">계정 탈퇴</span>
      <div>
        <Button
          isLink={false}
          classname="withdraw-button flex-center inline-block shrink-0 rounded-xs text-14"
          onClick={() => showModal('withdrawalModal')}
        >
          영구탈퇴하기
        </Button>
        <span className="text-14 text-[#C90000]">! 탈퇴시 기존 링크 및 자료가 전부 소멸됩니다.</span>
      </div>
      {modals[modals?.length - 1] === 'withdrawalModal' && <WithdrawalModal />}
    </div>
  );
}

export default DeleteBox;
