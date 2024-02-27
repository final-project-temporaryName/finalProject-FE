'use client';

import { deleteLinks } from '@/api/links/deleteLinks';
import { postLinks } from '@/api/links/postLinks';
import { putLinks } from '@/api/links/putLinks';
import { getMyPage } from '@/api/users/getMyPage';
import Input from '@/components/Input/Input';
import BinIcon from '@/components/SvgComponents/BinIcon';
import EditIcon from '@/components/SvgComponents/EditIcon';
import SaveIcon from '@/components/SvgComponents/SaveIcon';
import { LinkInputProps } from '@/types/input';
import { UserType } from '@/types/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useId, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

function LinkInput({ link, remove, index, handleLinkErrorUpdate, handleAddLink }: LinkInputProps) {
  const [isModified, setIsModified] = useState(false);
  const [isEditIconVisible, setIsEditIconVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveIconClicked, setSaveIconClicked] = useState(false);
  const [userInfo, setUserInfo] = useState<UserType>();
  const [currentLinkId, setCurrentLinkId] = useState(link.linkId);
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    formState: { errors },
    watch,
    control,
  } = useFormContext();
  const id = useId();
  const { linkId } = link;

  const router = useRouter();

  const handleFetchMyProfile = useCallback(async () => {
    const { userProfileResponse } = await getMyPage();

    setUserInfo(userProfileResponse);
  }, []);

  const userId = userInfo?.userId;

  //POST
  const queryClient = useQueryClient();

  const postLinkMutation = useMutation({
    mutationFn: postLinks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });

  const handleSaveIconClick = async () => {
    if (typeof userId !== 'number') {
      console.error('userId is undefined or not a number');
      return;
    }

    setIsEditing(false);
    setIsModified(false);
    setIsEditIconVisible(true);

    const title = watch(`links[${index}].title`);
    const url = watch(`links[${index}].url`);

    postLinkMutation.mutate(
      { userId, title, url },
      {
        onSuccess: (data) => {
          const newLink = {
            title,
            url,
            linkId: data.data.linkId,
          };
          handleAddLink?.(newLink);
          setCurrentLinkId(data.data.linkId);
          setSaveIconClicked(true);
          setIsModified(false);
          if (handleLinkErrorUpdate) {
            handleLinkErrorUpdate(false);
          }
        },
        onError: (error) => {
          console.error(error);
          if (handleLinkErrorUpdate) {
            handleLinkErrorUpdate(true);
          }
        },
        onSettled: () => {
          setIsLoading(false);
        },
      },
    );
  };

  //PUT
  const putLinkMutation = useMutation({
    mutationFn: putLinks,
  });

  const handleEditSaveIconClick = async () => {
    if (typeof userId !== 'number' || typeof linkId !== 'number') {
      console.error('userId or linkId is undefined or not a number');
      return;
    }

    const title = watch(`links[${index}].title`);
    const url = watch(`links[${index}].url`);

    setIsLoading(true);
    setIsEditing(false);
    setIsModified(false);

    putLinkMutation.mutate(
      { userId, linkId, title, url },
      {
        onSuccess: () => {
          setIsLoading(false);
          setSaveIconClicked(true);
          setIsEditIconVisible(true);
        },
        onError: (error) => {
          console.error('Failed to update the link:', error);
          setIsLoading(false);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      },
    );
  };

  //Delete
  const deleteLinkMutation = useMutation({
    mutationFn: deleteLinks,
  });

  const handleBinIconClick = async () => {
    if (typeof userId !== 'number' || typeof linkId !== 'number') {
      console.error('userId or linkId is undefined or not a number');
      return;
    }

    deleteLinkMutation.mutate(
      { userId, linkId },
      {
        onSuccess: (data) => {
          remove();
          setSaveIconClicked(false);
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  const handleEditIconClick = () => {
    setIsEditIconVisible(false);
    setSaveIconClicked(false);
    setIsEditing(true);
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

  const handleBlur = () => {};

  useEffect(() => {
    handleFetchMyProfile();
  }, [handleFetchMyProfile]);

  useEffect(() => {
    if (linkId) {
      setSaveIconClicked(true);
      setIsEditIconVisible(true);
    } else {
      setSaveIconClicked(false);
      setIsEditIconVisible(false);
    }
  }, [linkId]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="relative ml-0 flex flex-col md:ml-10">
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
              style={saveIconClicked ? 'xs-input mr-20 save-input md:mr-10 md:placeholder:text-12' : 'xs-input mr-20 md:mr-10 md:placeholder:text-12'}
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
              style={saveIconClicked ? 'lg-input mr-10 save-input md:placeholder:text-12' : 'lg-input mr-10 md:placeholder:text-12'}
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
        <div className="flex-center w-60 md:w-40">
          {isEditing ? (
            // 편집 모드일 때 저장 아이콘 표시, 편집 완료 처리
            <SaveIcon className="flex-center" onClick={handleEditSaveIconClick} />
          ) : isEditIconVisible ? (
            // 저장 후 편집 및 삭제 아이콘 표시
            <div className="flex gap-10">
              <BinIcon onClick={handleBinIconClick} />
              <EditIcon onClick={handleEditIconClick} />
            </div>
          ) : (
            // 기본 상태에서 저장 아이콘 표시
            <SaveIcon className="flex-center" onClick={handleSaveIconClick} />
          )}
        </div>
      </div>
      <div className="absolute bottom-0 right-130">
        {isModified && !saveIconClicked && <div className="text-10 text-[#c90000]">링크 저장이 필요합니다</div>}
      </div>
    </div>
  );
}

export default LinkInput;
