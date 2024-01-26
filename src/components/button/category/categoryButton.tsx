'use client';

import '@/styles/tailwind.css';

interface CategoryButtonProps {
  labelText: string;
  isActive: boolean;
  onClick?: (buttonLabel: string) => void;
}

// TODO: 사용할 때 props에 적절한 내용과 온클릭 함수 넣어주세요.
const CategoryButton = ({ labelText, isActive, onClick }: CategoryButtonProps) => {
  const labelClass = isActive ? 'category-button-focus' : 'category-button';

  return (
    <button className={labelClass} onClick={() => onClick?.(labelText)}>
      {labelText}
    </button>
  );
};

export default CategoryButton;
