'use client';

import CategoryButtonGroup from '@/components/Button/Category/CategoryButtonGroup';
import CardContainer from '@/components/Card/CardContainer';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

function MainContainer() {
  const [label, setLabel] = useState<'전체' | '판매중' | '컬렉션'>('전체');

  const pathname = usePathname();

  return (
    <main className={`ml-330 ${pathname === '/mypage' ? 'mt-157' : 'mt-77'}`}>
      <CategoryButtonGroup setMyPageValue={setLabel} />
      <CardContainer type="mypage" />
    </main>
  );
}

export default MainContainer;
