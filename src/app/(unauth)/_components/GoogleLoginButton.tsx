'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

function GoogleLoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex h-500 items-center justify-center">
        {session.user?.email} 로 로그인하였습니다.
        <button className="h-auto w-150 rounded-sm bg-primary-1 hover:bg-primary-3" onClick={() => signOut()}>
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-500 items-center justify-center">
      로그인 하세요.
      <button className="h-auto w-150 rounded-sm bg-primary-1 hover:bg-primary-3" onClick={() => signIn()}>
        로그인
      </button>
    </div>
  );
}

export default GoogleLoginButton;
