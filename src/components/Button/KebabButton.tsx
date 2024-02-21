'use client';

import useDropDown from '@/hooks/useDropDown';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useStore } from '@/store';
import Image from 'next/image';
import { MouseEvent, useRef } from 'react';
import ProfileDropDownImage from '../../../public/assets/icons/KebabDropDown.svg';
import KebabImage from '../../../public/assets/images/KebabImage.png';

function KebabButton({ artworkId }: { artworkId: number }) {
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
    showModal('editModal');
    setClickedArtworkId(artworkId);
  };

  const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setClickedArtworkId(artworkId);
    showModal('askForDelete');
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
