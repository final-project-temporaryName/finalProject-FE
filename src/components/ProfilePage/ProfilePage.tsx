'use client';

import instance from '@/api/axios';
import { getMyPage } from '@/api/users/getMyPage';
import Input from '@/components/Input/Input';
import LinkInput from '@/components/Input/LinkInput';
import PlusButtonIcon from '@/components/SvgComponents/PlusButtonIcon';
import { nicknameRules } from '@/constants/InputErrorRules';
import { useStore } from '@/store';
import { GetMyPageResponseType, GetUserLinks, PostUserLinks, PutRequestSignUp, UserType } from '@/types/users';
import getUserInfo from '@/utils/getUserInfo';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
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

  const { setUserAccessToken, setUserRefreshToken, setUserRole, setUserId } = useStore((state) => ({
    setUserAccessToken: state.setUserAccessToken,
    setUserRefreshToken: state.setUserRefreshToken,
    setUserRole: state.setUserRole,
    setUserId: state.setUserId,
  }));

  const methods = useForm<UserData>({
    defaultValues: {
      nickname: '',
      activityArea: '',
      activityField: '',
      description: '',
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
    setValue,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  const router = useRouter();
  const userInfo = getUserInfo();
  const nickname = watch('nickname');
  const buttonText = mode === 'create' ? '가입하기' : '저장하기';
  const isNicknameInvalid = !isNicknameAvailable;
  // 닉네임 입력 필드에 에러가 있거나 닉네임이 사용 불가능한 경우
  const isFormInvalid = Object.keys(errors).length > 0;
  // react-hook-form의 errors 객체를 사용하여 폼의 유효성 검사 결과에 에러가 있는지 확인
  const isLinkInputInvalid = hasLinkError;
  // 링크 입력 필드에 에러가 있는 경우
  const isNicknameEmpty = nickname.length === 0;
  // 닉네임 필드가 비어 있는 경우를 체크 (닉네임 필드가 필수인 경우에만 적용)

  const disableSaveButton = isNicknameInvalid || isFormInvalid || isLinkInputInvalid || isNicknameEmpty;

  const response = useQuery<GetMyPageResponseType>({
    queryKey: ['userProfile'],
    queryFn: getMyPage,
  });

  const userProfileResponse = response?.data?.userProfileResponse as UserType;

  const getProfileData = useCallback(() => {
    setUploadedImageUrl(userProfileResponse?.profileImageUrl ?? '');
    setIsNicknameAvailable(true);
    // 각 폼 필드에 대한 데이터가 있다면, 해당 값을 사용하여 setValue 호출
    setValue('profileImageUrl', userProfileResponse?.profileImageUrl ?? '');
    setValue('nickname', userProfileResponse?.nickname ?? '');
    setValue('activityArea', userProfileResponse?.activityArea ?? '');
    setValue('activityField', userProfileResponse?.activityField ?? '');
    setValue('description', userProfileResponse?.description ?? '');

    // 링크 데이터 처리
    if (userProfileResponse?.links && userProfileResponse?.links.length > 0) {
      setValue('links', userProfileResponse?.links);
    } else {
      setValue('links', [{ title: '', url: '' }]);
    }
  }, [userProfileResponse]);

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

  const handleImageUpload = (url: string) => {
    setUploadedImageUrl(url);
  };

  const handleLinkErrorUpdate = (hasError: boolean) => {
    setHasLinkError(hasError);
  };

  const handleAddLink = (newLink: GetUserLinks) => {
    setLinks((prevLinks) => [...prevLinks, newLink]);
  };

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  return (
    <FormProvider {...methods}>
      <form className="flex h-full w-screen flex-col md:mr-0" onSubmit={handleSubmit(onSubmit)}>
        <div className={`flex-center ${mode === 'edit' ? 'mr-150' : ''} gap-20 md:mr-0`}>
          <div className={`relative pb-100 ${mode === 'edit' ? 'pt-160 md:pt-50' : 'pt-30'}`}>
            <div className="md:flex-center relative ml-70 flex items-center gap-10 md:ml-0">
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
                style="md-input relative md:placeholder:text-12"
                register={register('nickname', nicknameRules)}
                error={errors.nickname?.message || nicknameError}
              />
              <div className="absolute left-170 top-27 text-[#C90000] md:left-135 md:top-13">*</div>
              <button
                type="button"
                className="primary-button duplication-button ml-0 justify-center md:ml-0"
                onClick={checkNickname}
              >
                중복확인
              </button>
            </div>
            <div className="flex-center ml-0 mt-60 gap-33 md:ml-10 md:gap-5">
              <Input
                label="활동지역"
                id="zone"
                placeholder="이태원"
                style="sm-input md:placeholder:text-12"
                register={register('activityArea')}
              />
              <Input
                label="활동분야"
                id="field"
                placeholder="3D Art"
                style="sm-input md:placeholder:text-12"
                register={register('activityField')}
              />
            </div>
            <div className="my-40 flex md:flex md:justify-center">
              <div className="ml-0 flex h-40 w-90 items-center justify-start gap-20 whitespace-nowrap p-10 text-18 md:ml-10 md:w-70 md:gap-5 md:text-14">
                소개글
              </div>
              <textarea
                className="min-h-92 w-465 resize-none rounded-xs bg-gray-1 p-15 text-14 focus:outline-none md:w-310 md:placeholder:text-12"
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
                    className="ml-90 md:ml-85"
                    onClick={(event) => {
                      event.preventDefault();
                      append({ title: '', url: '' });
                    }}
                  >
                    <PlusButtonIcon />
                  </button>
                  <span className="tooltip-text">5개까지 링크 추가 가능</span>
                </div>
              )}
            </div>
            <button
              type="submit"
              className={`primary-button storage-button flex-end absolute -right-[155px] md:-bottom-[10px] md:right-0 ${disableSaveButton ? 'disabled-button' : ''}`}
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
