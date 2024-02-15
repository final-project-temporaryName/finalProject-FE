import TrashCan from '../../../../../public/assets/icons/Trashcan.svg';

interface DeleteAllImageButtonProps {
  onClick: () => void;
}

function DeleteAllImageButton({ onClick }: DeleteAllImageButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-auto items-center justify-center rounded-xl bg-gray-4 px-20 py-10 text-white hover:bg-primary"
    >
      <TrashCan alt="이미지 추가" width={24} height={24} />
      전체 삭제
    </button>
  );
}

export default DeleteAllImageButton;
