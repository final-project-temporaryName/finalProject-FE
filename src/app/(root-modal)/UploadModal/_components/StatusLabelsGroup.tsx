'use client';

import { Button } from '@/components/Button';
import '@/styles/tailwind.css';
import { Dispatch, SetStateAction, useState } from 'react';

enum ButtonCategoryText {
  'PUBLIC' = '게시용',
  'SELLING' = '판매용',
  'FREE' = '나눔용',
}

interface Props {
  setStatusValue:
    | Dispatch<SetStateAction<'PUBLIC' | 'SELLING' | 'FREE'>>
    | Dispatch<SetStateAction<'PUBLIC' | 'SELLING' | 'FREE' | undefined>>;
  statusValue?: 'PUBLIC' | 'SELLING' | 'FREE' | undefined;
}

function StatusLabelsGroup({ setStatusValue, statusValue }: Props) {
  const [content, setContent] = useState(statusValue ? ButtonCategoryText[statusValue] : '');
  const labelTexts: ButtonCategoryText[] = [
    ButtonCategoryText.PUBLIC, // 게시용
    ButtonCategoryText.SELLING, // 판매용
    ButtonCategoryText.FREE, // 나눔용
  ];

  const handleActive = (buttonLabel: string) => {
    setContent(buttonLabel);
  };

  return (
    <div className="flex gap-16">
      {labelTexts.map((labelText, idx) => (
        <Button.Category
          key={idx}
          labelText={labelText}
          type="StatusLabel"
          onClick={handleActive}
          setStatusValue={setStatusValue}
          isActive={content ? content === labelText : labelText === '게시용'}
        />
      ))}
    </div>
  );
}

export default StatusLabelsGroup;
