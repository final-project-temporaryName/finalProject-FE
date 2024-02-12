'use client';

import CategoryButtonGroup from '@/components/Button/Category/CategoryButtonGroup';
import CardContainer from '@/components/Card/CardContainer';
import { usePathname } from 'next/navigation';

function MainContainer() {
  const pathname = usePathname();

  return (
    <main className={`ml-330 ${pathname === '/mypage' ? 'mt-157' : 'mt-77'}`}>
      <CategoryButtonGroup />
      <CardContainer type="mypage" />
    </main>
  );
}

export default MainContainer;
