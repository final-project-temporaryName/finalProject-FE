'use client';

import { Button } from '@/components/Button';
import { Dispatch, SetStateAction, useState } from 'react';

enum ButtonCategoryText {
  'ALL' = '전체',
  'FOLLOWING' = 'following',
}

interface Props {
  setMainValue: Dispatch<SetStateAction<'전체' | 'following'>>;
}

function MainLabelsGroup({ setMainValue }: Props) {
  const [content, setContent] = useState('');
  const labelTexts: ButtonCategoryText[] = [
    ButtonCategoryText.ALL, // 전체
    ButtonCategoryText.FOLLOWING, // following
  ];

  const handleActive = (buttonLabel: string) => {
    setContent(buttonLabel);
  };

  return (
    <div className="align-center flex gap-50">
      {labelTexts.map((labelText, idx) => (
        <Button.Category
          key={idx}
          labelText={labelText}
          type="MainLabel"
          onClick={handleActive}
          setMainValue={setMainValue}
          isActive={content ? content === labelText : labelText === '전체'}
        />
      ))}
    </div>
  );
}

export default MainLabelsGroup;
