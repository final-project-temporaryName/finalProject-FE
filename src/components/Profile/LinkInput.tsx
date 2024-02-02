'use client';

import Input from '@/components/Input/Input';
import BinIcon from '@/components/SvgComponents/BinIcon/BinIcon';
import CheckIcon from '@/components/SvgComponents/CheckIcon/CheckIcon';
import { useState } from 'react';

interface LinkType {
  id: number;
}

interface LinkInputProps {
  link: LinkType;
  removeLink: (id: number) => void;
  index: number;
}

function LinkInput({ link, removeLink, index }: LinkInputProps) {
  const [isCheckIconVisible, setIsCheckIconVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleIconClick = () => {
    setIsLoading(true);

    if (isCheckIconVisible) {
      setIsCheckIconVisible(false);
    } else {
      removeLink(link.id);
      setIsCheckIconVisible(true);
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mb-10 flex items-center justify-center gap-24">
      <Input
        label={index === 0 ? '외부링크' : ' '}
        id={`link${link.id}`}
        placeholder={index === 0 ? 'Behance' : '링크제목'}
        style="xs-input"
      />
      <Input
        id={`link${link.id}`}
        placeholder={index === 0 ? 'http://behance.com' : '링크 붙여넣기'}
        style="lg-input"
      />
      {isCheckIconVisible ? <CheckIcon onClick={handleIconClick} /> : <BinIcon onClick={handleIconClick} />}
    </div>
  );
}

export default LinkInput;
