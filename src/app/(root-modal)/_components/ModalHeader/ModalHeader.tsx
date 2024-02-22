'use client';

import { Button } from '@/components/Button';
import { useStore } from '@/store';
import { dateFormat } from '@/utils/date';
import Image from 'next/image';
import defaultProfileImg from '../../../../../public/assets/images/logo.png';

interface ModalHeaderProps {
  nickname?: string;
  profileImageUrl?: string;
}

// TODO: 프로필 이미지 연결하기
function ModalHeader({ nickname, profileImageUrl }: ModalHeaderProps) {
  const { modals, hideModal } = useStore((state) => ({
    modals: state.modals,
    hideModal: state.hideModal,
  }));

  return (
    <div className="relative flex justify-between border-b-1 border-solid border-primary-5 pb-24 pl-34 pr-42 pt-24 align-middle text-14">
      <Button.Modal.Close onClickClose={() => hideModal(modals[modals.length - 1])} />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-between gap-8">
        <div className="relative h-32 w-32  overflow-hidden rounded-full">
          <Image
            src={profileImageUrl ? profileImageUrl : defaultProfileImg}
            alt="프로필 이미지"
            fill
            objectFit="cover"
          />
        </div>
        <p className="text-14 font-semibold">{nickname}</p>
      </div>
      <div className="text-center text-[#8f8f8f]">{dateFormat()}</div>
    </div>
  );
}

export default ModalHeader;
