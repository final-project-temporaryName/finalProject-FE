import UploadImage from '../../../../..//public/assets/icons/cloud_upload.svg';

interface BeforeUploadImageProps {
  onClick: () => void;
}

function BeforeUploadImage({ onClick }: BeforeUploadImageProps) {
  return (
    <div className="flex h-auto w-213 flex-col items-center">
      <button
        onClick={onClick}
        className="mb-12 flex h-40 w-124 justify-center gap-3 rounded-[200px] border-1 border-solid border-black py-8 align-middle hover:border-white hover:bg-gray-4 hover:text-white"
      >
        <UploadImage className="mb-8 hover:fill-white" width={24} height={24} alt={'이미지 업로드'} />
        사진 추가
      </button>
      <p className="whitespace-nowrap text-[10px] text-gray-5">사람들에게 소개할 작품의 사진을 업로드 해주세요</p>
      <p className="text-[10px] text-gray-5">최대 10장까지 가능해요</p>
    </div>
  );
}

export default BeforeUploadImage;
