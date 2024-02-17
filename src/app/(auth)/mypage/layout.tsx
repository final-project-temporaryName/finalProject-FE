import CheckLogin from '@/components/CheckLogin';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <CheckLogin />
      {children}
    </>
  );
}
