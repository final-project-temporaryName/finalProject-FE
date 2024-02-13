'use client';

import '@/styles/tailwind.css';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import logoImg from '../../../public/assets/images/logo.png';
import SearchBar from './SearchBar';

function NavBar({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const pathnameArr = pathname.split('/');
  const firstPathname = pathnameArr[1];

  return (
    <nav
      className={`navBar ${pathname === '/' || firstPathname === 'upload' || firstPathname === 'flow' || firstPathname === 'art' ? 'relative' : 'fixed'}`}
    >
      <div className="flex flex-grow items-center justify-start gap-60">
        <Link href={'/'} className="shrink-0">
          <Image src={logoImg} alt="아트 톡톡 로고" width={85} height={85} />
        </Link>
        <SearchBar />
      </div>
      {children}
    </nav>
  );
}

export default NavBar;
