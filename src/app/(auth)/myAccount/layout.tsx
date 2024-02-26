'use client';

import CheckLogin from '@/components/CheckLogin';
import Tab from '@/components/Tab/Tab';
import { ReactNode, useState } from 'react';

interface LayoutProps {
  editProfile: ReactNode;
  deleteProfile: ReactNode;
}

export default function Layout({ editProfile, deleteProfile }: LayoutProps) {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <>
      <CheckLogin />
      <div className="items-middle md:flex-col-center flex flex-row">
        <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'profile' ? editProfile : deleteProfile}
      </div>
    </>
  );
}
