'use client';

import { useStore } from '@/store';
import { ReactNode } from 'react';

interface Props {
  main: JSX.Element;
  artist: JSX.Element;
  children: ReactNode;
}

export default function ParallelChildren({ main, artist, children }: Props) {
  const clickedArtworkUrl = useStore((state) => state.clickedArtworkUrl);

  if (clickedArtworkUrl === '') {
    return main;
  } else if (clickedArtworkUrl === 'mypage') {
    return children;
  } else if (clickedArtworkUrl === 'artist') {
    return artist;
  }
}
