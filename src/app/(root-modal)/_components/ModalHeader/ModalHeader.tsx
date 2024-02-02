'use client';

import { Button } from '@/components/Button';
import { dateFormat } from '@/utils/date';
import DefaultProfile from '../../../../../public/assets/icons/ProfileImg.svg';

interface Props {
  onClickClose: () => void;
}

// TODO: 프로필 이미지 연결하기
function ModalHeader({ onClickClose }: Props) {
  return (
    <div className="flex justify-between pb-20 pl-34 pr-42 pt-36 align-middle text-14">
      <Button.Modal.Close onClickClose={onClickClose} />
      <div className="flex items-center justify-between gap-8">
        {/*게시물 업로드 API 나오면 작가 닉네임과 프로필 이미지 붙여넣기 */}
        <DefaultProfile alt="프로필 이미지" width={32} height={32} />
        <p className="text-14 font-semibold">작가 닉네임</p>
      </div>
      <div className="text-[#8f8f8f]">{dateFormat()}</div>
    </div>
  );
}

export default ModalHeader;
