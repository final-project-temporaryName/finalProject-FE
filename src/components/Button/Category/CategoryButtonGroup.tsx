'use client';

import '@/styles/tailwind.css';
import { useState } from 'react';
import { Button } from '..';
import { ButtonCategoryText } from './CategoryButton.types';

function CategoryButtonGroup() {
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
    <div className="flex gap-40 align-middle">
      {labelTexts.map((labelText, idx) => (
        <Button.Category
          key={idx}
          labelText={labelText}
          onClick={handleActive}
          isActive={content ? content === labelText : labelText === '전체'}
        />
      ))}
    </div>
  );
}

export default CategoryButtonGroup;
