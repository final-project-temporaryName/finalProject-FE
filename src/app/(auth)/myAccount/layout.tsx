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
    <div className="flex flex-row">
      <CheckLogin />
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'profile' ? editProfile : deleteProfile}
    </div>
  );
}
