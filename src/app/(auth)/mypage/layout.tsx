import CheckLogin from '@/components/CheckLogin';
import SideBar from '@/components/SideBar/SideBar';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <CheckLogin />
      <SideBar displayStatus="myWork" />
      {children}
    </>
  );
}
