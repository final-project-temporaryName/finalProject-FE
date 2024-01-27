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

// 주소가 localhost:3000일 때는 children->page.tsx, modal->@modal/default.tsx
// 주소가 localhost:3000/flow/login일 때는 children->page.tsx(login폴더의 page.tsx로 인함), modal->@modal/flow/login/page.tsx
