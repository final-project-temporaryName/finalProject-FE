'use client';

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function Tab({ activeTab, setActiveTab }: TabProps) {
  return (
    <div className="md:flex-center ml-100 mt-160 md:ml-0 md:mt-120 md:flex-row md:gap-40">
      <button
        className="flex-center relative h-100 w-200 cursor-pointer border-b-1 border-solid border-gray-4 text-18 md:w-100 md:border-none"
        onClick={() => setActiveTab('profile')}
      >
        {activeTab === 'profile' && (
          <div className="absolute left-0 top-20 h-56 w-4 bg-[#ff2049] md:left-5 md:top-70 md:h-4 md:w-88"></div>
        )}
        프로필 수정
      </button>
      <button className="flex-center relative h-100 w-200 text-18 md:w-100" onClick={() => setActiveTab('account')}>
        {activeTab === 'account' && (
          <div className="absolute left-0 top-20 h-56 w-4 bg-[#ff2049] md:left-5 md:top-70 md:h-4 md:w-88"></div>
        )}
        계정 정보
      </button>
    </div>
  );
}

export default Tab;
