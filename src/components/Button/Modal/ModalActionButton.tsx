import { PropsWithChildren } from 'react';

interface Props {
  disabled: boolean;
  wrapperStyle: string;
  buttonStyle: string;
  onClick: () => void;
}

function ModalActionButton({ disabled, wrapperStyle, buttonStyle, onClick, children }: PropsWithChildren<Props>) {
  return (
    <div className={`${wrapperStyle}`}>
      <button className={`${buttonStyle}`} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default ModalActionButton;
