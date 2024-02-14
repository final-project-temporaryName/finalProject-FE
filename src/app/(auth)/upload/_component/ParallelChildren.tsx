'use client';

import { useStore } from '@/store';
import { ReactNode } from 'react';

interface Props {
  main: JSX.Element;
  artist: JSX.Element;
  children: ReactNode;
}

export default function ParallelChildren({ main, artist, children }: Props) {
  const clickedUploadArtworkUrl = useStore((state) => state.clickedUploadArtworkUrl);

  if (clickedUploadArtworkUrl === '') {
    return main;
  } else if (clickedUploadArtworkUrl === 'mypage') {
    return children;
  } else if (clickedUploadArtworkUrl === 'artist') {
    return artist;
  }
}
