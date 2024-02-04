'use client';

import Input from '@/components/Input/Input';
import BinIcon from '@/components/SvgComponents/BinIcon';
import CheckIcon from '@/components/SvgComponents/CheckIcon';
import EditIcon from '@/components/SvgComponents/EditIcon';
import axios from '@/lib/axios';
import { useState } from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

interface Props {
  link: { id: number };
  removeLink: (id: number) => void;
  index: number;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
}

function LinkInput({ link, removeLink, index }: Props) {
  const [isEditIconVisible, setIsEditIconVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkIconClicked, setCheckIconClicked] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [linkId, setLinkId] = useState(null);

  const handleCheckIconClick = async () => {
    setIsLoading(true);
    setCheckIconClicked(true);
    setIsEditIconVisible(true);

    try {
      const response = await axios.post('/users/4/links', { title, url });
      setLinkId(response.data.id);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  const handleBinIconClick = async () => {
    setIsLoading(true);
    removeLink(link.id);
    setCheckIconClicked(false);

    if (linkId) {
      try {
        await axios.delete(`/users/4/links/${linkId}`);
        setIsEditIconVisible(false);
      } catch (error) {
        console.error(error);
      }
    }

    setIsLoading(false);
  };

  const handleEditIconClick = () => {
    setIsEditIconVisible(false);
    setCheckIconClicked(false);

    // 추후에 PUT 요청 로직 추가
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex-start mb-10 flex">
      <Input
        label={index === 0 ? '외부링크' : ' '}
        id={`link${link.id}`}
        placeholder={index === 0 ? 'Behance' : '링크제목'}
        style={checkIconClicked ? 'xs-input mr-20 bg-gray-500' : 'xs-input mr-20'}
        readOnly={checkIconClicked}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Input
        id={`link${link.id}`}
        placeholder={index === 0 ? 'http://behance.com' : '링크 붙여넣기'}
        style={checkIconClicked ? 'lg-input mr-10 bg-gray-500' : 'lg-input mr-10'}
        readOnly={checkIconClicked}
        onChange={(event) => setUrl(event.target.value)}
      />
      <div className="flex-center w-60">
        {checkIconClicked ? (
          <div className="flex gap-10">
            <BinIcon onClick={handleBinIconClick} />
            {isEditIconVisible && <EditIcon onClick={handleEditIconClick} />}
          </div>
        ) : (
          <CheckIcon onClick={handleCheckIconClick} />
        )}
      </div>
    </div>
  );
}

export default LinkInput;
