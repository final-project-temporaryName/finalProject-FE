'use client';

import { useStore } from '@/store';
import { usePathname } from 'next/navigation';
import { Button } from '../Button';
import ButtonFallbackUI from '../FallbackUI/NavBar/ButtonFallbackUI';
import { useEffect } from 'react';

interface Props {
  isLogin?: boolean;
}

function NavigatorBoxButton({ isLogin }: Props) {
  const pathname = usePathname();
  const pathnameArr = pathname.split('/');
  const firstPathname = pathnameArr[1];

  const setClickedUploadArtworkUrl = useStore((state) => state.setClickedUploadArtworkUrl);
  const setLogout = useStore((state) => state.setLogout);

  const handleUploadButtonClick = () => {
    setClickedUploadArtworkUrl(firstPathname);
  };

  useEffect(() => {
    const userAuth = window.localStorage.getItem('store');

    if (userAuth) {
      const parsedUserAuth = JSON.parse(userAuth);
      const { state } = parsedUserAuth;
      if (!Object.keys(state).includes('isLogin')) {
        const changeIsLogin = setTimeout(() => {
          setLogout();
        }, 1000);

        return () => clearTimeout(changeIsLogin);
      }
    }
    return undefined;
  }, []);

  if (typeof isLogin === 'undefined') {
    return <ButtonFallbackUI />;
  }

  return (
    <>
      {isLogin ? (
        <Button destination="/upload" classname="primary-button nav-upload-button" onClick={handleUploadButtonClick}>
          작품 업로드
        </Button>
      ) : (
        <Button destination="/login" classname="primary-button nav-login-button">
          로그인
        </Button>
      )}
    </>
  );
}

export default NavigatorBoxButton;
