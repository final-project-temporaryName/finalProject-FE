'use client';

import { useParams } from 'next/navigation';

function SearchResult() {
  const params = useParams<{ searchWord: string }>();

  return (
    <div className="text-25">
      검색하신 <span className="text-primary"> "{decodeURI(params.searchWord)}"</span> <br />
      과(와) 관련된 작품의 최신순 결과입니다
    </div>
  );
}

export default SearchResult;
