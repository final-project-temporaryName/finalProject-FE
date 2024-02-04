'use client';

import Input from '@/components/Input/Input';
import BinIcon from '@/components/SvgComponents/BinIcon/BinIcon';
import CheckIcon from '@/components/SvgComponents/CheckIcon/CheckIcon';
import EditIcon from '@/components/SvgComponents/EditIcon/EditIcon';
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
  const [isEditIconVisible, setIsEditIconVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkIconClicked, setCheckIconClicked] = useState(false);

  const handleIconClick = () => {
    setIsLoading(true);

    if (isCheckIconVisible) {
      setIsCheckIconVisible(false);
      setIsEditIconVisible(true);
      setCheckIconClicked(true);
    } else {
      removeLink(link.id);
      setIsCheckIconVisible(true);
      setCheckIconClicked(false);
    }

    setIsLoading(false);
  };

  const handleEditIconClick = () => {
    setIsEditIconVisible(false);
    setIsCheckIconVisible(true);
    setCheckIconClicked(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-start mb-10 flex">
      <Input
        label={index === 0 ? '외부링크' : ' '}
        id={`link${link.id}`}
        placeholder={index === 0 ? 'Behance' : '링크제목'}
        style={checkIconClicked ? 'xs-input mr-20 bg-gray-500' : 'xs-input mr-20'}
        readOnly={checkIconClicked}
      />
      <Input
        id={`link${link.id}`}
        placeholder={index === 0 ? 'http://behance.com' : '링크 붙여넣기'}
        style={checkIconClicked ? 'lg-input mr-10 bg-gray-500' : 'lg-input mr-10'}
        readOnly={checkIconClicked}
      />
      <div className="flex-center w-60">
        {isCheckIconVisible ? (
          <CheckIcon onClick={handleIconClick} />
        ) : (
          <div className="flex gap-10">
            <BinIcon onClick={handleIconClick} />
            {isEditIconVisible && <EditIcon onClick={handleEditIconClick} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default LinkInput;