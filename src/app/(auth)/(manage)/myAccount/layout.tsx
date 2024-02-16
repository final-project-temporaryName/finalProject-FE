'use client';

import Tab from '@/components/Tab/Tab';
import { useState } from 'react';

export default function Layout({ editProfile, deleteModal }: any) {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex flex-row gap-119">
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'profile' ? editProfile : deleteModal}
    </div>
  );
}
