import { PropsWithChildren } from 'react';

interface Props {
  style?: string;
}

function ModalBody({ style, children }: PropsWithChildren<Props>) {
  return <div className={`${style}`}>{children}</div>;
}

export default ModalBody;
