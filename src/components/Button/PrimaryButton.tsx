import '@/styles/tailwind.css';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  destination?: string;
  style: string;
  children: ReactNode;
}

// destination: 사용할 때 props에 이동할 Route를 string 형태로 넣어주세요.
// style: tailwindCSS를 넣어주세요.
export default function PrimaryButton({ destination, style, children }: Props) {
  return (
    <Link href={`${destination}`}>
      <button className={`${style}`}>{children}</button>
    </Link>
  );
}
