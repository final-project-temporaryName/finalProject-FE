'use client';

import { useStore } from '@/store';
import { Button } from '../Button';
import { usePathname } from 'next/navigation';

interface Props {
  isLogin: boolean;
}

function NavigatorBoxButton({ isLogin }: Props) {
  const pathname = usePathname();
  const pathnameArr = pathname.split('/');
  const firstPathname = pathnameArr[1];

  const setClickedUploadArtworkUrl = useStore((state) => state.setClickedUploadArtworkUrl);

  const handleUploadButtonClick = () => {
    setClickedUploadArtworkUrl(firstPathname);
  };

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
