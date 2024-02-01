'use client';

import Image from 'next/image';
import { MouseEvent } from 'react';
import KebabImage from '../../../public/assets/images/KebabImage.png';

function KebabButton() {
  const handleKebabClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('kebab button clicked!');
  };

  return (
    <button onClick={(e) => handleKebabClick(e)} title="Kebab">
      <Image src={KebabImage} alt="케밥버튼 이미지" width={30} height={30} />
    </button>
  );
}

export default KebabButton;
