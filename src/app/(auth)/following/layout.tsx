import MainLabelsGroup from '@/app/(unauth)/_components/Main/MainLabelsGroup';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <MainLabelsGroup />
      {children}
    </>
  );
}
