'use client';

import Input from '@/components/Input/Input';
import BinIcon from '@/components/SvgComponents/BinIcon';
import SaveIcon from '@/components/SvgComponents/SaveIcon';
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
  handleLinkErrorUpdate?: any;
}

function LinkInput({ link, removeLink, index, handleLinkErrorUpdate }: Props) {
  const [isEditIconVisible, setIsEditIconVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveIconClicked, setSaveIconClicked] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [linkId, setLinkId] = useState(null);
  const [isModified, setIsModified] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSaveIconClick = async () => {
    setIsLoading(true);
    setSaveIconClicked(true);
    setIsEditIconVisible(true);

    try {
      const response = await axios.post('/users/4/links', { title, url });
      setLinkId(response.data.id);
      setIsModified(false);
      setShowError(false);
      handleLinkErrorUpdate(false);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  const handleBinIconClick = async () => {
    setIsLoading(true);
    removeLink(link.id);
    setSaveIconClicked(false);

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
    setSaveIconClicked(false);

    // 추후에 PUT 요청 로직 추가
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
      setIsModified(true);
      setShowError(false);
    };

  const handleBlur = () => {
    if (isModified && !saveIconClicked) {
      setShowError(true);
      handleLinkErrorUpdate(true);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="relative flex flex-col">
      <div className="flex-start mb-15 flex">
        <Input
          label={index === 0 ? '외부링크' : ' '}
          id={`link${link.id}`}
          placeholder={index === 0 ? 'Behance' : '링크제목'}
          style={saveIconClicked ? 'xs-input mr-20 save-input' : 'xs-input mr-20'}
          readOnly={saveIconClicked}
          onChange={handleInputChange(setTitle)}
          value={title}
          onBlur={handleBlur}
        />
        <Input
          id={`link${link.id}`}
          placeholder={index === 0 ? 'http://behance.com' : '링크 붙여넣기'}
          style={saveIconClicked ? 'lg-input mr-10 save-input' : 'lg-input mr-10'}
          readOnly={saveIconClicked}
          onChange={handleInputChange(setUrl)}
          value={url}
          onBlur={handleBlur}
        />
        <div className="flex-center w-60">
          {saveIconClicked ? (
            <div className="flex gap-10">
              <BinIcon onClick={handleBinIconClick} />
              {isEditIconVisible && <EditIcon onClick={handleEditIconClick} />}
            </div>
          ) : (
            <SaveIcon onClick={handleSaveIconClick} className="flex-center" />
          )}
        </div>
      </div>
      <div className="absolute bottom-1 right-240">
        {showError && <div className="text-10 text-[#c90000]">링크 저장이 필요합니다!</div>}
      </div>
    </div>
  );
}

export default LinkInput;
