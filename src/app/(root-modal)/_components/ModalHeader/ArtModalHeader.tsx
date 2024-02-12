'use client';

import { Button } from '@/components/Button';
import { dateFormat } from '@/utils/date';
import DefaultProfile from '../../../../../public/assets/icons/ProfileImg.svg';

interface ModalHeaderProps {
  onClickClose: () => void;
}

// TODO: 프로필 이미지 연결하기
function ArtModalHeader({ onClickClose }: ModalHeaderProps) {
  return (
    <div className="relative flex justify-between border-b-1 border-solid border-primary-5 pb-24 pl-34 pr-42 pt-24 align-middle text-14">
      <Button.Modal.Close onClickClose={onClickClose} />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 justify-between">
        <div className="text-center text-[#8f8f8f]">{dateFormat()}</div>
      </div>
      {/*게시물 업로드 API 나오면 작가 닉네임과 프로필 이미지 붙여넣기 */}
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-8 pr-5">
          <DefaultProfile alt="프로필 이미지" width={32} height={32} />
          <p className="text-14 font-semibold">작가 닉네임</p>
        </div>
        <button className="primary-button artModal-follow-button">Follow</button>
        <Button destination="/chat" classname="primary-button artModal-chat-button">
          1:1 채팅
        </Button>
      </div>
    </div>
  );
}

export default ArtModalHeader;
