import React from 'react';
import UploadImage from '../../../../..//public/assets/icons/cloud_upload.svg';

interface BeforeUploadImageProps {
  onClick: () => void;
}

function BeforeUploadImage({ onClick }: BeforeUploadImageProps) {
  return (
    <div className="flex h-138 w-213 flex-col items-center">
      <UploadImage className="mb-8" width={32} height={32} alt={'이미지 업로드'} />
      <p className="whitespace-nowrap text-[10px] text-gray-5">사람들에게 소개할 작품의 사진을 업로드 해주세요</p>
      <p className="mb-20 text-[10px] text-gray-5">최대 10장까지 가능해요</p>
      <button
        onClick={onClick}
        className="flex h-50 w-213 items-center justify-center rounded-[200px] border-1 border-solid border-black py-13 hover:border-primary hover:bg-primary hover:text-white"
      >
        사진 가져오기
      </button>
    </div>
  );
}

export default BeforeUploadImage;
