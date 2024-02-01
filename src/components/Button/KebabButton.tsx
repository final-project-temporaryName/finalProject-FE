'use client';

import Image from 'next/image';
import { MouseEvent, useRef } from 'react';
import KebabImage from '../../../public/assets/images/KebabImage.png';
import ProfileDropDownImage from '../../../public/assets/icons/KebabDropDown.svg';
import useDropDown from '@/hooks/useDropDown';
import useOnClickOutside from '@/hooks/useOnClickOutside';

function KebabButton() {
  const containerRef = useRef<HTMLButtonElement>(null);
  const { isOpen: isDropDownOpen, handleDropDownOpen, handleDropDownClose } = useDropDown();

  useOnClickOutside(containerRef, handleDropDownClose);

  const handleKebabClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isDropDownOpen) handleDropDownClose();
    else handleDropDownOpen();
  };

  return (
    <button onClick={(e) => handleKebabClick(e)} title="Kebab">
      <Image src={KebabImage} alt="케밥버튼 이미지" width={30} height={30} />
      {isDropDownOpen && <ProfileDropDownImage />}
    </button>
  );
}

export default KebabButton;
