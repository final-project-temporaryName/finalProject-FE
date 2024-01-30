import { PropsWithChildren } from 'react';

interface Props {
  classname?: string;
}

function ModalBody({ classname, children }: PropsWithChildren<Props>) {
  return <div className={`${classname}`}>{children}</div>;
}

export default ModalBody;
