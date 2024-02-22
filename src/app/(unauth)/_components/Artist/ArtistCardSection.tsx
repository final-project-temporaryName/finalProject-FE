'use client';

import CardContainer from '@/components/Card/CardContainer';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ArtistLabelsGroup from './ArtistLabelsGroup';

function ArtistCardSection() {
  const [label, setLabel] = useState<'전체' | '판매중'>('전체');

  const pathname = usePathname();
  const pathnameArr = pathname.split('/');
  const firstPathname = pathnameArr[1];

  return (
    <main className={`ml-330 ${firstPathname === 'artist' ? 'mt-157' : 'mt-77'}`}>
      <ArtistLabelsGroup setArtistValue={setLabel} />
      <CardContainer type="artist" categoryType={label} />
    </main>
  );
}

export default ArtistCardSection;
