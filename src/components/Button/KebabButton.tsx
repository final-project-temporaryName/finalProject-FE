'use client';

import Image from 'next/image';
import { MouseEvent, useRef } from 'react';
import KebabImage from '../../../public/assets/images/KebabImage.png';
import ProfileDropDownImage from '../../../public/assets/icons/KebabDropDown.svg';
import useDropDown from '@/hooks/useDropDown';
import useOnClickOutside from '@/hooks/useOnClickOutside';

function KebabButton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isOpen: isDropDownOpen, handleDropDownOpen, handleDropDownClose } = useDropDown();

  useOnClickOutside(containerRef, handleDropDownClose);

  const handleKebabClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isDropDownOpen) handleDropDownClose();
    else handleDropDownOpen();
  };

  const handleModifyClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
