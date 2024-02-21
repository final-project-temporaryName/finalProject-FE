import CheckMyPage from '@/components/CheckMyPage';
import SideBar from '@/components/SideBar/SideBar';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <CheckMyPage />
      <SideBar displayStatus="notMyWork" />
      {children}
    </>
  );
}
