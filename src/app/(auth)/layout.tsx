import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  modal: ReactNode;
}

export default function Layout({ children, modal }: Props) {
  return (
    <div className="h-dvh w-dvw bg-white">
      {children}
      {modal}
    </div>
  );
}
