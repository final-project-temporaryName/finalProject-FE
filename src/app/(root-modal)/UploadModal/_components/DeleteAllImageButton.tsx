import TrashCan from '../../../../../public/assets/icons/Trashcan.svg';

interface DeleteAllImageButtonProps {
  onClick: () => void;
}

function DeleteAllImageButton({ onClick }: DeleteAllImageButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex h-40 w-124 items-center justify-center gap-6 rounded-xl border-1 border-solid border-black py-8 hover:border-white hover:bg-gray-4 hover:text-white"
    >
      <TrashCan alt="이미지 추가" width={12} height={15} />
      전체 삭제
    </button>
  );
}

export default DeleteAllImageButton;
