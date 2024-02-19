'use client';

import CardContainer from '@/components/Card/CardContainer';
import { useState } from 'react';
import MainLabelsGroup from './MainLabelsGroup';
import { getArtworks } from '@/api/artworks/getArtworks';

function MainCardSection() {
  const [label, setLabel] = useState<'전체' | 'following'>('전체');

  return (
    <div className="flex-col-center relative mt-25">
      <MainLabelsGroup setMainValue={setLabel} />
      <CardContainer type="main" queryKey={['allArtworks']} queryFn={getArtworks} />
    </div>
  );
}

export default MainCardSection;
