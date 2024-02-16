'use client';

import useIfLogin from '@/utils/getUserInfo';
import { useStore } from '@/store';

export default function FetchUserInfo() {
  const { setUserId } = useStore((state) => ({
    setUserId: state.setUserId,
  }));

  const userInfo = useIfLogin();

  return null;
}
