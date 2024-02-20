'use client';

import UploadModal from '@/app/(root-modal)/UploadModal/UploadModal';
import { useStore } from '@/store';
import { useEffect } from 'react';
import { Button } from '../Button';
import ButtonFallbackUI from '../FallbackUI/NavBar/ButtonFallbackUI';

interface Props {
  isLogin?: boolean;
}

function NavigatorBoxButton({ isLogin }: Props) {
  const { modals, showModal, setLogout } = useStore((state) => ({
    modals: state.modals,
    showModal: state.showModal,
    setLogout: state.setLogout,
  }));

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
        <Button isLink={false} classname="primary-button nav-upload-button" onClick={() => showModal('uploadModal')}>
          작품 업로드
        </Button>
      ) : (
        <Button isLink={true} destination="/login" classname="primary-button nav-login-button">
          로그인
        </Button>
      )}
      {modals[modals?.length - 1] === 'uploadModal' && <UploadModal />}
    </>
  );
}

export default NavigatorBoxButton;
