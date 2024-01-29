'use client';

import { MouseEvent } from 'react';

function GoogleLoginButton() {
  const handleGoogleLoginClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-500 items-center justify-center">
      <button
        className="h-auto w-150 rounded-sm bg-primary-1 hover:bg-primary-3"
        onClick={(e) => handleGoogleLoginClick(e)}
      >
        구글 로그인 버튼
      </button>
    </div>
  );
}

export default GoogleLoginButton;
