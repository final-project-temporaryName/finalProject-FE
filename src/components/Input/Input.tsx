'use client';

import { nicknameRules } from '@/constants/InputErrorRules';
import '@/styles/tailwind.css';
import { useForm } from 'react-hook-form';

interface Props {
  label: string;
  id: string;
  type?: 'text' | 'nickname';
  placeholder?: string;
  error?: string;
  register?: any;
}

function Input({ label, id, type = 'text', placeholder, error }: Props) {
  const {
    register,
    formState: { errors },
    setError,
  } = useForm();

  const handleInputFocusOut = (e: React.FocusEvent<HTMLInputElement>) => {
    // 포커스가 벗어났을 때 유효성 검사를 수행합니다.
    const isValid = e.target.checkValidity();
    if (!isValid) {
      // 유효하지 않은 값인 경우 에러 메시지를 표시합니다.
      setError(id, { message: 'Invalid value' });
    }
  };

  return (
    <div className="mb-10 flex">
      <label htmlFor={id} className="flex-center h-40 w-auto gap-20 whitespace-nowrap p-10 text-18">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`primary-input h-40 w-280 rounded-xs ${error ? 'error-class' : ''}`}
        {...(type === 'nickname' ? register(id, nicknameRules) : register(id))} // nickname type인 경우 nicknameRules 적용
        onBlur={handleInputFocusOut}
      />
      {error && <p className="text-red">{error}</p>}
    </div>
  );
}

export default Input;
