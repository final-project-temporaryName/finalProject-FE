'use client';

import { Button } from '@/components/Button';
import { Dispatch, SetStateAction, useState } from 'react';

enum ButtonCategoryText {
  'ALL' = '전체',
  'SELLING' = '판매중',
}

interface Props {
  setArtistValue: Dispatch<SetStateAction<'전체' | '판매중'>>;
}

function ArtistLabelsGroup({ setArtistValue }: Props) {
  const [content, setContent] = useState('');
  const labelTexts: ButtonCategoryText[] = [
    ButtonCategoryText.ALL, // 전체
    ButtonCategoryText.SELLING, // 판매중
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
          type="Category"
          onClick={handleActive}
          setArtistValue={setArtistValue}
          isActive={content ? content === labelText : labelText === '전체'}
        />
      ))}
    </div>
  );
}

export default ArtistLabelsGroup;
