'use client';

import CardContainer from '@/components/Card/CardContainer';
import { useState } from 'react';
import MainLabelsGroup from './MainLabelsGroup';

function MainCardSection() {
  const [label, setLabel] = useState<'전체' | 'following'>('전체');

  return (
    <div className="flex-col-center relative mt-20">
      <MainLabelsGroup setMainValue={setLabel} />
      <CardContainer />
    </div>
  );
}

export default MainCardSection;
