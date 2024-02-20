'use client';

import instance from '@/api/axios';
import { getMyPage } from '@/api/users/getMyPage';
import Input from '@/components/Input/Input';
import LinkInput from '@/components/Input/LinkInput';
import PlusButtonIcon from '@/components/SvgComponents/PlusButtonIcon';
import { nicknameRules } from '@/constants/InputErrorRules';
import { useStore } from '@/store';
import { GetUserLinks, PostUserLinks, PutRequestSignUp } from '@/types/users';
import getUserInfo from '@/utils/getUserInfo';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

interface UserData extends PutRequestSignUp {
  links: PostUserLinks[];
}

interface Props {
  mode: 'create' | 'edit';
}

function ProfilePage({ mode }: Props) {
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [hasLinkError, setHasLinkError] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const [links, setLinks] = useState<GetUserLinks[]>([]);

  const router = useRouter();
  const userInfo = getUserInfo();

  const { setUserAccessToken, setUserRefreshToken, setUserRole, setUserId } = useStore((state) => ({
    setUserAccessToken: state.setUserAccessToken,
    setUserRefreshToken: state.setUserRefreshToken,
    setUserRole: state.setUserRole,
    setUserId: state.setUserId,
  }));

  const methods = useForm<UserData>({
    defaultValues: {
      links: [{ title: '', url: '' }],
    },
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    register,
    control,
    watch,
    reset,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  const nickname = watch('nickname');

  const disableSaveButton =
    hasLinkError || !isNicknameAvailable || Object.keys(errors).length > 0 || nickname.length === 0;

  const handleImageUpload = (url: string) => {
    setUploadedImageUrl(url);
  };

  const buttonText = mode === 'create' ? '가입하기' : '저장하기';
  const mutationFn =
    mode === 'create'
      ? (userData: UserData) => {
          const { links, ...rest } = userData;
          return instance.put(`/sign-up`, rest);
        }
      : (userData: UserData) => {
          const { links, ...rest } = userData;
          return instance.put(`/users/${userInfo?.userId}`, rest);
        };

  const putUserMutation = useMutation({
    mutationFn,
  });

  const onSubmit = (data: UserData) => {
    const userData: UserData = {
      ...data,
      profileImageUrl: uploadedImageUrl,
    };

    putUserMutation.mutate(userData, {
      onSuccess: (data) => {
        const response = data.data;
        if (response) {
          const { accessToken, refreshToken, role, userId } = response;

          setUserAccessToken(accessToken);
          setUserRefreshToken(refreshToken);
          setUserRole(role);
          setUserId(userId);

          router.replace('/');
        } else {
          router.replace('/mypage');
        }
      },
      onError: (error) => {
        alert('처리하는 과정에서 에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
        console.error(error);
      },
    });
  };

  const removeLink = (index: number) => {
    remove(index);
    if (fields.length <= 1) {
      append({ title: '', url: '' });
    }
  };

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

  const handleAddLink = (newLink: GetUserLinks) => {
    setLinks((prevLinks) => [...prevLinks, newLink]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { userProfileResponse } = await getMyPage();
        setUploadedImageUrl(userProfileResponse.profileImageUrl);
        reset({
          ...userProfileResponse,
          links: userProfileResponse.links ? userProfileResponse.links : [{ title: '', url: '' }],
        });
        setIsNicknameAvailable(true);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchData();
  }, [reset]);

  return (
    <FormProvider {...methods}>
      <form className="mr-100 flex h-full w-screen flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-center gap-20">
          <div className={`pb-100 ${mode === 'edit' ? 'pt-160' : 'pt-30'}`}>
            <div className="relative ml-75 flex items-center gap-10 md:ml-30 md:gap-4">
              <Input
                type="file"
                id="file"
                accept="image/*"
                register={register('profileImageUrl')}
                onImageUpload={handleImageUpload}
                defaultValue={uploadedImageUrl}
              />
              <Input
                type="nickname"
                label="닉네임"
                id="nickname"
                placeholder="작가명을 써주세요"
                style="md-input relative primary-input"
                register={register('nickname', nicknameRules)}
                error={errors.nickname?.message || nicknameError}
              />
              <div className="absolute left-170 top-27 text-[#C90000] md:left-150">*</div>
              <button
                type="button"
                className="primary-button duplication-button ml-0 justify-center md:ml-22"
                onClick={checkNickname}
              >
                중복확인
              </button>
            </div>
            <div className="ml-0 mt-60 flex gap-33 md:ml-10 md:gap-5">
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
              <div className="ml-0 flex h-40 w-90 items-center justify-start gap-20 whitespace-nowrap p-10 text-18 md:ml-10 md:w-70 md:gap-5 md:text-14">
                소개글
              </div>
              <textarea
                className="min-h-92 w-465 resize-none rounded-xs bg-gray-1 p-15 text-14 focus:outline-none md:w-375 "
                placeholder="사람들에게 나를 알릴 수 있는 글을 자유롭게 적어보세요."
                {...register('description')}
              ></textarea>
            </div>
            <div>
              {fields.map((field, index) => (
                <LinkInput
                  key={field.id}
                  link={field}
                  remove={() => removeLink(index)}
                  index={index}
                  handleLinkErrorUpdate={handleLinkErrorUpdate}
                  handleAddLink={handleAddLink}
                />
              ))}
              {fields.length < 5 && (
                <div className="tooltip">
                  <button
                    className="ml-90"
                    onClick={(event) => {
                      event.preventDefault(); // mypage로 리다이렉트 시키는 것 차단
                      append({ title: '', url: '' });
                    }}
                  >
                    <PlusButtonIcon />
                  </button>
                  <span className="tooltip-text">5개까지 링크 추가 가능</span>
                </div>
              )}
            </div>
          </div>
          <div className="mb-10 mt-auto flex justify-end">
            <button
              type="submit"
              className={`primary-button storage-button flex-end ${disableSaveButton ? 'disabled' : ''}`}
              disabled={disableSaveButton}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default ProfilePage;
