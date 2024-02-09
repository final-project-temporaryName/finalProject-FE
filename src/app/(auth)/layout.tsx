import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  modal: ReactNode;
}

export default function Layout({ children, modal }: Props) {
  return (
    <div className="h-vh w-vw bg-white">
      {children}
      {modal}
    </div>
  );
}
