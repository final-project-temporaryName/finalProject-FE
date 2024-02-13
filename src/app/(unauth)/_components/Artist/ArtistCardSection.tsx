'use client';

import CardContainer from '@/components/Card/CardContainer';
import { useState } from 'react';
import ArtistLabelsGroup from './ArtistLabelsGroup';

function ArtistCardSection() {
  const [label, setLabel] = useState<'전체' | '판매중'>('전체');

  return (
    <div className="relative mt-25 flex-col">
      <ArtistLabelsGroup setArtistValue={setLabel} />
      <CardContainer type="mypage" />
    </div>
  );
}

export default ArtistCardSection;
