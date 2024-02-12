import NavBar from '@/components/NavBar/NavBar';
import ProfilePage from '@/components/ProfilePage/ProfilePage';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="h-100dvh w-100dvw bg-white">
      <NavBar />
      <ProfilePage type="put" />
    </div>
  );
}
