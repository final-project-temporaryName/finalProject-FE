'use client';

import '@/styles/tailwind.css';
import cn from 'classnames';
import { useEffect, useState } from 'react';

interface CategoryButtonProps {
  content: string;
  onClick?: (e) => void;
}

// TODO: 사용할 때 props에 적절한 내용과 온클릭 함수 넣어주세요.
const CategoryButton = ({ content, onClick }: CategoryButtonProps) => {
  const [isActive, setIsActive] = useState(content === '전체');

  const labelClass = cn('category-button', { 'category-button:focus': isActive });

  const handleActive = (e): void => {
    setIsActive(e.target.value === content);
  };

  useEffect(() => {}, []);

  return (
    <button value={content} className={labelClass} onClick={handleActive}>
      {content}
    </button>
  );
};

export default CategoryButton;
