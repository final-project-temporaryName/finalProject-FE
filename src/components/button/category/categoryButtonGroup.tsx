'use client';

import CategoryButton from '@/components/button/category/categoryButton';
import '@/styles/tailwind.css';
import { useState } from 'react';

function CategoryButtonGroup() {
  const [content, setContent] = useState('');
  const labelTexts = ['전체', '판매중', '컬렉션'];

  const handleActive = (buttonLabel: string) => {
    setContent(buttonLabel);
  };

  return (
    <div className="flex gap-40 align-middle">
      {labelTexts.map((labelText, idx) => (
        <CategoryButton
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
