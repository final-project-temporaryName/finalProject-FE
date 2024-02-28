import NavBar from '@/components/NavBar/NavBar';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="h-100vh w-100vw bg-white">
      <NavBar />
      <div className="mx-20 md:flex md:flex-col">{children}</div>
    </div>
  );
}
