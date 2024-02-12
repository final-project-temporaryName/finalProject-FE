import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  modal: ReactNode;
}

export default function Layout({ children, modal }: Props) {
  return (
    <div className="h-100dvh w-100dvw bg-white">
      {children}
      {modal}
    </div>
  );
}
