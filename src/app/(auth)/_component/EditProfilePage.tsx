'use client';

import instance from '@/api/axios';
import Input from '@/components/Input/Input';
import LinkInput from '@/components/Input/LinkInput';
import PlusButtonIcon from '@/components/SvgComponents/PlusButtonIcon';
import { nicknameRules } from '@/constants/InputErrorRules';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

export interface UserData {
  nickname: string;
  profileImageUrl: string;
  activityArea: string;
  activityField: string;
  description: string;
  links?: { title: string; url: string }[];
}

function EditProfilePage() {
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [hasLinkError, setHasLinkError] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<UserData>({ mode: 'onBlur' });
  const [links, setLinks] = useState<{ id: number }[]>([{ id: 0 }]);
  const idCount = useRef(1); // useRef를 사용하여 idCount를 관리

  const disableSaveButton = hasLinkError || !isNicknameAvailable;

  const handleImageUpload = (url: string) => {
    setUploadedImageUrl(url);
  };

  const putUserMutation = useMutation({
    mutationFn: (userData: UserData) => instance.put('/users/4', userData),
  });

  const onSubmit = (data: UserData) => {
    const userData: UserData = {
      ...data,
      profileImageUrl: uploadedImageUrl,
    };

    putUserMutation.mutate(userData, {
      onSuccess: (data) => {
        // 성공 후 처리 로직, 예: 사용자를 정보 페이지로 리디렉션
        console.log(userData);
      },
      onError: (error) => {
        alert('처리하는 과정에서 에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
      },
    });
  };

  const addLink = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (links.length < 5) {
      setLinks((prevLinks) => [...prevLinks, { id: idCount.current++ }]);
    }
  };

  const removeLink = (id: number) => {
    setLinks((prevLinks) =>
      prevLinks.length === 1 ? [{ id: idCount.current++ }] : prevLinks.filter((link) => link.id !== id),
    );
  };

  const renderLinks = () =>
    links.map((link, index) => (
      <LinkInput
        key={link.id}
        link={link}
        removeLink={removeLink}
        index={index}
        register={register}
        watch={watch}
        handleLinkErrorUpdate={handleLinkErrorUpdate}
      />
    ));

  const renderAddButton = () =>
    links.length < 5 && (
      <div className="tooltip">
        <button className="ml-90" onClick={addLink}>
          <PlusButtonIcon />
        </button>
        <span className="tooltip-text">5개까지 링크 추가 가능</span>
      </div>
    );

  const checkNicknameMutation = useMutation({
    mutationFn: (nickname: string) => instance.get(`/users/check?nickname=${nickname}`),
    onSuccess: () => {
      setNicknameError('사용 가능한 닉네임입니다.');
      setIsNicknameAvailable(true);
    },
    onError: (error: any) => {
      if (error.response.status === 409) {
        setNicknameError('이미 사용 중인 닉네임입니다.');
      } else {
        setNicknameError('닉네임 체크에 실패했습니다. 다시 시도해주세요.');
      }
      setIsNicknameAvailable(false);
    },
  });

  const checkNickname = () => {
    const nickname = watch('nickname');
    if (nickname) {
      checkNicknameMutation.mutate(nickname);
    }
  };

  const handleLinkErrorUpdate = (hasError: boolean) => {
    setHasLinkError(hasError);
  };

  return (
    <>
      <form className="relative mt-160 flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-center">
          <div className="h-475 w-571">
            <div className="relative ml-75 flex items-center gap-10">
              <Input
                type="file"
                id="image_file"
                accept="image/*"
                register={register('profileImageUrl')}
                onImageUpload={handleImageUpload}
              />
              <Input
                type="nickname"
                label="닉네임"
                id="nickname"
                placeholder="작가명을 써주세요"
                style="md-input relative"
                register={register('nickname', nicknameRules)}
                error={errors.nickname?.message || nicknameError}
              />
              <div className="absolute left-170 top-27 text-[#C90000]">*</div>
              <button
                type="button"
                className="primary-button duplication-button justify-center"
                onClick={checkNickname}
              >
                중복확인
              </button>
            </div>
            <div className="mt-30 flex gap-33">
              <Input
                label="활동지역"
                id="zone"
                placeholder="이태원"
                style="sm-input"
                register={register('activityArea')}
              />
              <Input
                label="활동분야"
                id="field"
                placeholder="3D Art"
                style="sm-input"
                register={register('activityField')}
              />
            </div>
            <div className="my-40 flex">
              <div className="flex h-40 w-90 items-center justify-start gap-20 whitespace-nowrap p-10 text-18">
                소개글
              </div>
              <textarea
                className="min-h-92 w-465 resize-none rounded-xs bg-gray-1 p-15 text-14 focus:outline-none "
                placeholder="사람들에게 나를 알릴 수 있는 글을 자유롭게 적어보세요."
                {...register('description')}
              ></textarea>
            </div>
            <div>
              {renderLinks()}
              {renderAddButton()}
            </div>
          </div>
        </div>
        <div className="absolute right-200 mt-100">
          <button
            type="submit"
            className={`primary-button storage-button ${disableSaveButton ? 'disabled' : ''}`}
            disabled={disableSaveButton}
          >
            저장하기
          </button>
        </div>
      </form>
    </>
  );
}

export default EditProfilePage;
