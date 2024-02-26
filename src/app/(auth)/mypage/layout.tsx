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
      <div className="md:flex-center md:flex md:w-full md:flex-col md:px-32">
        <SideBar displayStatus="myWork" />
        {/* {children} */}
      </div>
    </>
  );
}
