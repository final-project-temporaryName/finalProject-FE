interface Props {
  onClickClose: () => void;
}

function ModalCloseButton({ onClickClose }: Props) {
  return (
    <button className="flex cursor-pointer items-center justify-center text-black" onClick={onClickClose} title="Close">
      나가기
    </button>
  );
}

export default ModalCloseButton;
