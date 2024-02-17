import NavBar from '@/components/NavBar/NavBar';
import NavigatorBox from '@/components/NavBar/NavigatorBox';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <NavBar>
        <NavigatorBox />
      </NavBar>
      {children}
    </>
  );
}
