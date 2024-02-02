'use client';

import { Button } from '@/components/Button';
import { dateFormat } from '@/utils/date';
import DefaultProfile from '../../../../../public/assets/icons/ProfileImg.svg';

interface ModalHeaderProps {
  onClickClose: () => void;
}

// TODO: 프로필 이미지 연결하기
function ModalHeader({ onClickClose }: ModalHeaderProps) {
  return (
    <div className="relative flex justify-between border-b-1 border-solid border-primary-5 pb-24 pl-34 pr-42 pt-24 align-middle text-14">
      <Button.Modal.Close onClickClose={onClickClose} />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-between gap-8">
        {/*게시물 업로드 API 나오면 작가 닉네임과 프로필 이미지 붙여넣기 */}
        <DefaultProfile alt="프로필 이미지" width={32} height={32} />
        <p className="text-14 font-semibold">작가 닉네임</p>
      </div>
      <div className="text-center text-[#8f8f8f]">{dateFormat()}</div>
    </div>
  );
}

export default ModalHeader;
