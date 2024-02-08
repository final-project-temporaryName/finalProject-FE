'use client';

import { useState } from 'react';
import MainLabelsGroup from './MainLabelsGroup';

function MainCardSection() {
  const [label, setLabel] = useState<'전체' | 'following'>('전체');

  return (
    <div className="flex-col-center mt-20">
      <MainLabelsGroup setMainValue={setLabel} />
    </div>
  );
}

export default MainCardSection;
