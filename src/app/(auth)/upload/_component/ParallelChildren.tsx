'use client';

import { useStore } from '@/store';
import { ReactNode } from 'react';

interface Props {
  main: JSX.Element;
  children: ReactNode;
}

export default function ParallelChildren({ main, children }: Props) {
  const clickedUploadArtworkUrl = useStore((state) => state.clickedUploadArtworkUrl);

  if (clickedUploadArtworkUrl === '') {
    return main;
  } else if (clickedUploadArtworkUrl === 'mypage') {
    return children;
  }
}
