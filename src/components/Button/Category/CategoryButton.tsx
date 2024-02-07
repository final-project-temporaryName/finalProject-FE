'use client';

import '@/styles/tailwind.css';
import { Dispatch, SetStateAction } from 'react';

interface CategoryButtonProps {
  type: 'Category' | 'Label';
  labelText: string;
  isActive: boolean;
  setValue?: Dispatch<SetStateAction<'PUBLIC' | 'SELLING' | 'FREE'>>;
  onClick?: (buttonLabel: string) => void;
}

// TODO: 사용할 때 props에 적절한 내용과 온클릭 함수 수정해서 넣어주세요.
function CategoryButton({ type, labelText, isActive, setValue, onClick }: CategoryButtonProps) {
  let labelClass;
  if (type === 'Category') {
    labelClass = isActive ? 'category-button-focus' : 'category-button';
  } else {
    labelClass = isActive ? 'label-button-focus' : 'label-button';
  }

  const handleButtonClick = () => {
    if (onClick && setValue) {
      onClick(labelText);
      if (labelText === '게시용') {
        setValue('PUBLIC');
      } else if (labelText === '판매용') {
        setValue('SELLING');
      } else {
        setValue('FREE');
      }
    }
  };

  return (
    <button className={labelClass} onClick={handleButtonClick}>
      {labelText}
    </button>
  );
}

export default CategoryButton;
