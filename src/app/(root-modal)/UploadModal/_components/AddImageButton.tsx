import AddImage from '../../../../../public/assets/icons/AddPhoto.svg';

interface AddImageButtonProps {
  onClick: () => void;
}

function AddImageButton({ onClick }: AddImageButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex h-96 w-96 items-center justify-center rounded-md border-2 border-solid border-primary-2"
    >
      <AddImage alt="이미지 추가" width={24} height={24} />
    </button>
  );
}

export default AddImageButton;
