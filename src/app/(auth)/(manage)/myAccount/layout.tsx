'use client';

import Tab from '@/components/Tab/Tab';
import { ReactNode, useState } from 'react';

interface LayoutProps {
  editProfile: ReactNode;
  deleteModal: ReactNode;
}

export default function Layout({ editProfile, deleteModal }: LayoutProps) {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex flex-row">
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'profile' ? editProfile : deleteModal}
    </div>
  );
}
