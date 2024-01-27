import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function ChatroomLayout({ children }: Props) {
  return <div className="">{children}</div>;
}

export default ChatroomLayout;
