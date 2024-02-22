'use client';

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function Tab({ activeTab, setActiveTab }: TabProps) {
  return (
    <div className="ml-100 mt-160">
      <button
        className="flex-center relative h-100 w-200 cursor-pointer border-b-1 border-solid border-gray-4 text-18"
        onClick={() => setActiveTab('profile')}
      >
        {activeTab === 'profile' && <div className="absolute left-0 top-20 h-56 w-4 bg-[#ff2049]"></div>}
        프로필 수정
      </button>
      <button className="flex-center relative h-100 w-200 text-18" onClick={() => setActiveTab('account')}>
        {activeTab === 'account' && <div className="absolute left-0 top-20 h-56 w-4 bg-[#ff2049]"></div>}
        계정 정보
      </button>
    </div>
  );
}

export default Tab;
