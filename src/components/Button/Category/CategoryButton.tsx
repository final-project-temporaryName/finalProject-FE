'use client';

import '@/styles/tailwind.css';
import { Dispatch, SetStateAction } from 'react';

interface CategoryButtonProps {
  type: 'Category' | 'StatusLabel' | 'MainLabel';
  labelText: string;
  isActive: boolean;
  setStatusValue?:
    | Dispatch<SetStateAction<'PUBLIC' | 'SELLING' | 'FREE'>>
    | Dispatch<SetStateAction<'PUBLIC' | 'SELLING' | 'FREE' | undefined>>;
  setMainValue?: Dispatch<SetStateAction<'전체' | 'following'>>;
  setArtistValue?: Dispatch<SetStateAction<'전체' | '판매중'>>;
  setMyPageValue?: Dispatch<SetStateAction<'전체' | '판매중' | '컬렉션'>>;
  onClick?: (buttonLabel: string) => void;
}

function CategoryButton({
  type,
  labelText,
  isActive,
  setStatusValue,
  setMainValue,
  setArtistValue,
  setMyPageValue,
  onClick,
}: CategoryButtonProps) {
  let labelClass;
  if (type === 'Category') {
    labelClass = isActive ? 'category-button-focus' : 'category-button';
  } else if (type === 'StatusLabel') {
    labelClass = isActive ? 'status-label-button-focus' : 'status-label-button';
  } else if (type === 'MainLabel') {
    labelClass = isActive ? 'main-label-button-focus' : 'main-label-button';
  }

  const handleButtonClick = () => {
    if (onClick) {
      onClick(labelText);
    }
    if (setStatusValue) {
      if (labelText === '게시용') {
        setStatusValue('PUBLIC');
      } else if (labelText === '판매용') {
        setStatusValue('SELLING');
      } else {
        setStatusValue('FREE');
      }
    }
    if (setMainValue) {
      if (labelText === '전체') {
        setMainValue('전체');
      } else {
        setMainValue('following');
      }
    }
    if (setArtistValue) {
      if (labelText === '전체') {
        setArtistValue('전체');
      } else {
        setArtistValue('판매중');
      }
    }
    if (setMyPageValue) {
      if (labelText === '전체') {
        setMyPageValue('전체');
      } else if (labelText === '판매중') {
        setMyPageValue('판매중');
      } else {
        setMyPageValue('컬렉션');
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
