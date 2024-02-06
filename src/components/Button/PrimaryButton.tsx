import '@/styles/tailwind.css';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  destination: string;
  classname: string;
  children: ReactNode;
  type?: 'button' | 'reset' | 'submit' | undefined;
}

// destination: 사용할 때 props에 이동할 Route를 string 형태로 넣어주세요.
// style: tailwindCSS를 넣어주세요.
export default function PrimaryButton({ destination, classname, children, type }: Props) {
  return (
    <Link href={`${destination}`}>
      <button className={`${classname}`} type={type}>
        {children}
      </button>
    </Link>
  );
}
