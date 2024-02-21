'use client';

import AskForSignupModal from '@/app/(root-modal)/AskForSignupModal/AskForSignupModal';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CheckLogin() {
  const router = useRouter();
  const { modals, showModal } = useStore((state) => ({
    modals: state.modals,
    showModal: state.showModal,
  }));

  const handleRedirect = () => {
    if (!window) return;

    const userAuth = window.localStorage.getItem('store');

    if (!userAuth) {
      router.replace('/');
    } else {
      const {
        state: { isLogin, userRole },
      } = JSON.parse(userAuth);

      if (isLogin === false || userRole === '') router.replace('/');
      else if (userRole === 'ASSOCIATE') showModal('askForSignup');
    }
  };

  useEffect(() => {
    handleRedirect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{modals[modals?.length - 1] === 'askForSignup' && <AskForSignupModal />}</>;
}
