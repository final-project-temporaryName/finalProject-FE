import { PropsWithChildren } from 'react';

interface Props {
  disabled: boolean;
  wrapperStyle: string;
  buttonStyle: string;
}

function ModalActionButton({ disabled, wrapperStyle, buttonStyle, children }: PropsWithChildren<Props>) {
  return (
    <div className={`${wrapperStyle}`}>
      <button className={`${buttonStyle}`} disabled={disabled} type="submit">
        {children}
      </button>
    </div>
  );
}

export default ModalActionButton;
