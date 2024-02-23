import CheckRegular from '@/components/CheckRegular';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <CheckRegular />
      {children}
    </>
  );
}
