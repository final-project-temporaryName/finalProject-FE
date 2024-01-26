'use client';

import '@/styles/tailwind.css';

interface UploadButtonProps {
  onClick: () => void;
}

// TODO: 사용할 때 props에 게시물 작성페이지로 이동하는 온클릭 함수 넣어주세요.
function UploadButton({ onClick }: UploadButtonProps) {
  return (
    <button className="primary-button h-50" onClick={onClick}>
      작품 업로드
    </button>
  );
}

export default UploadButton;
