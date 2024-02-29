'use client';

import CategoryButtonGroup from '@/components/Button/Category/CategoryButtonGroup';
import CardContainer from '@/components/Card/CardContainer';
import { useState } from 'react';

function MainContainer() {
  const [label, setLabel] = useState<'전체' | '판매중' | '컬렉션'>('전체');

  return (
    <main className={`ml-330 mt-157 md:ml-0 md:mt-60`}>
      <CategoryButtonGroup setMyPageValue={setLabel} />
      <CardContainer type="mypage" categoryType={label} />
    </main>
  );
}

export default MainContainer;
