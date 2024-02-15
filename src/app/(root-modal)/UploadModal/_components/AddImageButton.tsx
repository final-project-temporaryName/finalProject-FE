import WhiteAddImage from '../../../../../public/assets/icons/WhiteAddPhoto.svg';

interface AddImageButtonProps {
  onClick: () => void;
}

function AddImageButton({ onClick }: AddImageButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-auto items-center justify-center rounded-xl bg-gray-4 px-20 py-10 text-white hover:bg-primary"
    >
      <WhiteAddImage alt="이미지 추가" width={24} height={24} />
      사진 추가
    </button>
  );
}

export default AddImageButton;
