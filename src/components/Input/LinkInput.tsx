'use client';

import { postLinks } from '@/api/links/postLinks';
import Input from '@/components/Input/Input';
import BinIcon from '@/components/SvgComponents/BinIcon';
import EditIcon from '@/components/SvgComponents/EditIcon';
import SaveIcon from '@/components/SvgComponents/SaveIcon';
import { useId, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  link: { id: string };
  remove: () => void;
  index: number;
  handleLinkErrorUpdate?: (hasError: boolean) => void;
}

function LinkInput({ link, remove, index, handleLinkErrorUpdate }: Props) {
  const [isModified, setIsModified] = useState(false);
  const [isEditIconVisible, setIsEditIconVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveIconClicked, setSaveIconClicked] = useState(false);
  const {
    register,
    formState: { errors },
    watch,
    control,
  } = useFormContext();
  const id = useId();

  const handleSaveIconClick = async () => {
    setIsModified(false);
    setIsEditIconVisible(true);

    const title = watch(`links[${index}].title`);
    const url = watch(`links[${index}].url`);

    try {
      await postLinks({ userId: 4, title, url });
      setSaveIconClicked(true);
      setIsModified(false);
      if (handleLinkErrorUpdate) {
        handleLinkErrorUpdate(false);
      }
    } catch (error) {
      console.error(error);

      if (handleLinkErrorUpdate) {
        handleLinkErrorUpdate(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBinIconClick = async () => {
    remove();
    setSaveIconClicked(false);
  };

  const handleEditIconClick = () => {
    setIsEditIconVisible(false);
    setSaveIconClicked(false);

    // 추후에 PUT 요청 로직 추가
  };

  const handleInputChange = () => {
    if (!saveIconClicked) {
      setIsModified(true);
      if (handleLinkErrorUpdate) {
        handleLinkErrorUpdate(true);
      }
    } else {
      setIsModified(false);
    }
  };

  const handleBlur = () => {
    // 아무 동작도 하지 않음
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="relative flex flex-col">
      <div className="flex-start mb-15 flex">
        <Controller
          name={`links[${index}].title`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              label={index === 0 ? '외부링크' : ' '}
              id={`link${id}`}
              placeholder={index === 0 ? 'Behance' : '링크제목'}
              style={saveIconClicked ? 'xs-input mr-20 save-input' : 'xs-input mr-20'}
              readOnly={saveIconClicked}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(event); // Controller의 onChange 메소드 호출
                handleInputChange(); // 사용자 정의 onChange 핸들러 호출
              }}
              onBlur={() => {
                field.onBlur(); // Controller의 onBlur 메소드 호출
                handleBlur(); // 사용자 정의 onBlur 핸들러 호출
              }}
              value={field.value}
            />
          )}
        />
        <Controller
          name={`links[${index}].url`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              id={`link${id}`}
              placeholder={index === 0 ? 'http://behance.com' : '링크 붙여넣기'}
              style={saveIconClicked ? 'lg-input mr-10 save-input' : 'lg-input mr-10'}
              readOnly={saveIconClicked}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(event);
                handleInputChange();
              }}
              onBlur={() => {
                field.onBlur();
                handleBlur();
              }}
              value={field.value}
            />
          )}
        />
        <div className="flex-center w-60">
          {saveIconClicked ? (
            <div className="flex gap-10">
              <BinIcon onClick={handleBinIconClick} />
              {isEditIconVisible && <EditIcon onClick={handleEditIconClick} />}
            </div>
          ) : (
            <SaveIcon className="flex-center" onClick={handleSaveIconClick} />
          )}
        </div>
      </div>
      <div className="absolute bottom-0 right-235">
        {isModified && !saveIconClicked && <div className="text-10 text-[#c90000]">링크 저장이 필요합니다!</div>}
      </div>
    </div>
  );
}

export default LinkInput;
