'use client';

import { useStore } from '@/store';
import { useSession } from 'next-auth/react';

function Main() {
  const { data: session } = useSession();
  const isLogin = useStore((state) => state.isLogin);

  console.log(session, isLogin);

  return (
    // 현재는 테스트 페이지
    <main className="flex min-h-screen flex-col items-center justify-center gap-100 p-24">전체 피드 페이지</main>
  );
}

export default Main;
