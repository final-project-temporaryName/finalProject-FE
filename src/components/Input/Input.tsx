'use client';

import PlusButtonIcon from '@/components/SvgComponents/PlusButtonIcon/PlusButtonIcon';
import UpLoadIcon from '@/components/SvgComponents/UpLoadIcon/UpLoadIcon';
import { nicknameRules } from '@/constants/InputErrorRules';
import '@/styles/tailwind.css';
import { ChangeEvent, useEffect, useState } from 'react';
import { UseFormRegisterReturn, useForm } from 'react-hook-form';

interface Props {
  label?: string;
  id: string;
  type?: 'text' | 'nickname' | 'file';
  placeholder?: string;
  error?: string;
  register?: UseFormRegisterReturn;
  style?: string;
  accept?: string;
}

function Input({ label, id, type = 'text', placeholder, error, style }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    setError,
  } = useForm();

  const inputClasses = type === 'file' ? `${style}` : `${style} primary-input rounded-xs ${error ? 'error-class' : ''}`;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const imgFile = e.target.files[0];
    if (imgFile && imgFile.type.substring(0, 5) === 'image') {
      // const response = await uploadUserImage(imgFile);
      // if (response.status !== 201) {
      //   console.log(response.data.error.message);
      //   return;
      // }
      setImageUrl(
        'https://images.unsplash.com/photo-1706603314698-be679b945f9b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D',
      );
    }
  };

  const handleImgDelete = (event: React.MouseEvent) => {
    event.preventDefault();
    setImageUrl(null);
  };

  const handleInputFocusOut = (e: React.FocusEvent<HTMLInputElement>) => {
    // 포커스가 벗어났을 때 유효성 검사를 수행합니다.
    const isValid = e.target.checkValidity();
    if (!isValid) {
      // 유효하지 않은 값인 경우 에러 메시지를 표시합니다.
      setError(id, { message: 'Invalid value' });
    }
  };

  useEffect(() => {
    setImageUrl(imageUrl);
  }, []);

  return (
    <div className="flex-center">
      {label && (
        <label htmlFor={id} className="flex h-40 w-90 items-center justify-start gap-20 whitespace-nowrap p-10 text-18">
          {label}
        </label>
      )}
      {type === 'file' ? (
        <div className="file-input-wrapper relative">
          {imageUrl ? (
            <img src={imageUrl} alt="Uploaded" className="h-95 w-95 rounded-full object-cover" />
          ) : (
            <div className="h-95 w-95"></div>
          )}
          <div
            className={`absolute inset-0 flex items-center justify-center ${imageUrl ? 'opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-70' : 'opacity-100'}`}
          >
            <input
              type={type}
              id={id}
              placeholder={placeholder}
              className="primary-input hidden-file-input"
              onChange={handleFileChange}
            />
            <label htmlFor={id} className="file-input-label">
              <div className="absolute right-25 top-20">
                <UpLoadIcon />
                <div className="mt-2 text-7">사진 가져오기</div>
              </div>
              {imageUrl && (
                <button className="absolute right-0 top-0" onClick={handleImgDelete}>
                  <PlusButtonIcon className="rotate-45" />
                </button>
              )}
            </label>
          </div>
        </div>
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={inputClasses}
          {...(type === 'nickname' ? register(id, nicknameRules) : register(id))}
          onBlur={handleInputFocusOut}
        />
      )}
      {error && <p className="text-red">{error}</p>}
    </div>
  );
}

export default Input;
