'use client';

import CardContainer from '@/components/Card/CardContainer';
import { useState } from 'react';
import ArtistLabelsGroup from './ArtistLabelsGroup';

function ArtistCardSection() {
  const [label, setLabel] = useState<'전체' | '판매중'>('전체');

  return (
    <main className={`ml-330 mt-157 md:ml-0 md:mt-60`}>
      <ArtistLabelsGroup setArtistValue={setLabel} />
      <CardContainer type="artist" categoryType={label} />
    </main>
  );
}

export default ArtistCardSection;
