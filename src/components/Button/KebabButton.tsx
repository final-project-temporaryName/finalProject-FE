'use client';

import Image from 'next/image';
import { MouseEvent, useRef } from 'react';
import KebabImage from '../../../public/assets/images/KebabImage.png';
import ProfileDropDownImage from '../../../public/assets/icons/KebabDropDown.svg';
import useDropDown from '@/hooks/useDropDown';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useStore } from '@/store';

function KebabButton() {
  // states
  const { isOpen: isDropDownOpen, handleDropDownOpen, handleDropDownClose } = useDropDown();
  const { showModal, setClickedArtworkId } = useStore((state) => ({
    showModal: state.showModal,
    setClickedArtworkId: state.setClickedArtworkId,
  }));

  // hooks
  const containerRef = useRef<HTMLDivElement>(null);

  // handlers
  useOnClickOutside(containerRef, handleDropDownClose);

  const handleKebabClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isDropDownOpen) handleDropDownClose();
    else handleDropDownOpen();
  };

  const handleModifyClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 특정 게시물의 정보가 들어간 업로드 모달 뜨기(게시물 id 전달)
    showModal('uploadModal');
  };

  const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: 게시물 삭제 API 함수 호출
  };

  return (
    <div className="relative" onClick={handleKebabClick} ref={containerRef}>
      <Image src={KebabImage} alt="케밥버튼 이미지" width={30} height={30} />
      {isDropDownOpen && (
        <div className="absolute right-[-26.2px] top-33">
          <ProfileDropDownImage />
          <div className="absolute left-2 top-5 flex h-103 w-60 flex-col rounded-sm">
            <button className="h-51 rounded-tl-sm rounded-tr-sm hover:bg-primary-1" onClick={handleModifyClick}>
              수정
            </button>
            <button
              className="h-52 rounded-bl-sm rounded-br-sm border-t-1 border-solid border-t-gray-4 hover:bg-primary-1"
              onClick={handleDeleteClick}
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default KebabButton;
