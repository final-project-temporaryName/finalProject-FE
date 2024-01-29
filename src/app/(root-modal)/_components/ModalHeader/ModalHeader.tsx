import { Button } from '@/components/Button';

interface Props {
  onClickClose: () => void;
  title: string;
}

function ModalHeader({ onClickClose, title }: Props) {
  return (
    <div className="px-80 pb-20 pt-36 text-31 font-bold">
      <Button.Modal.Close onClickClose={onClickClose} />
      <div>{title}</div>
    </div>
  );
}

export default ModalHeader;
