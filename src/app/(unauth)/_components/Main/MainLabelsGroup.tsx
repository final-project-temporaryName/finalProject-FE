'use client';

import AskForLoginModal from '@/app/(root-modal)/AskForLoginModal/AskForLoginModal';
import { Button } from '@/components/Button';
import { useStore } from '@/store';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { useState } from 'react';

enum ButtonCategoryText {
  'ALL' = '전체',
  'FOLLOWING' = 'following',
}

function MainLabelsGroup() {
  const pathname = usePathname();
  const pathnameArr = pathname.split('/');
  const firstPathname = pathnameArr[1];

  const [content, setContent] = useState(firstPathname === 'following' ? 'following' : '전체');
  const segment = useSelectedLayoutSegment();
  const isLogin = useStore((state) => state.isLogin);

  const labelTexts: ButtonCategoryText[] = isLogin
    ? [
        ButtonCategoryText.ALL, // 전체
        ButtonCategoryText.FOLLOWING, // following
      ]
    : [
        ButtonCategoryText.ALL, // 전체
      ];

  const handleActive = (buttonLabel: string) => {
    setContent(buttonLabel);
  };

  if (segment !== null && segment !== 'following') return null;

  return (
    <div className="align-center mt-30 flex w-full justify-center gap-50">
      {labelTexts.map((labelText, idx) => (
        <Button.Category
          key={idx}
          labelText={labelText}
          type="MainLabel"
          navigate={true}
          onClick={handleActive}
          isActive={content ? content === labelText : labelText === '전체'}
        />
      ))}
    </div>
  );
}

export default MainLabelsGroup;
