'use client';

import '@/styles/tailwind.css';
import { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '..';

enum ButtonCategoryText {
  'ALL' = '전체',
  'TRADING' = '판매중',
  'COLLECTION' = '컬렉션',
}

interface Props {
  setMyPageValue: Dispatch<SetStateAction<'전체' | '판매중' | '컬렉션'>>;
}

function CategoryButtonGroup({ setMyPageValue }: Props) {
  const [content, setContent] = useState('');
  const labelTexts: ButtonCategoryText[] = [
    ButtonCategoryText.ALL, // 전체
    ButtonCategoryText.TRADING, // 판매중
    ButtonCategoryText.COLLECTION, // 컬렉션
  ];

  const handleActive = (buttonLabel: string) => {
    setContent(buttonLabel);
  };

  return (
    <div className="flex gap-40 align-middle md:gap-30">
      {labelTexts.map((labelText, idx) => (
        <Button.Category
          key={idx}
          labelText={labelText}
          onClick={handleActive}
          type="Category"
          setMyPageValue={setMyPageValue}
          isActive={content ? content === labelText : labelText === '전체'}
        />
      ))}
    </div>
  );
}

export default CategoryButtonGroup;
