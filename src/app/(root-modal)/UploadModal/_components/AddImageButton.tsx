import UploadImage from '../../../../..//public/assets/icons/cloud_upload.svg';

interface AddImageButtonProps {
  onClick: () => void;
}

function AddImageButton({ onClick }: AddImageButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex h-40 w-124 items-center justify-center gap-3 rounded-xl border-1 border-solid border-black py-8 hover:border-white hover:bg-gray-4 hover:text-white"
    >
      <UploadImage alt="이미지 추가" width={24} height={24} />
      사진 추가
    </button>
  );
}

export default AddImageButton;
