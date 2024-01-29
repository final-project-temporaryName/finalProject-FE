'use client';

import { useForm } from 'react-hook-form';

interface Props {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
}

function Input({ label, id, type = 'text', placeholder }: Props) {
  return (
    <div className="mb-4 flex">
      <label htmlFor={id} className="flex-center h-40 w-auto gap-20 p-10 text-18">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className="text-gray-700 w-full rounded-[8px] border-none bg-gray-1 p-8 text-14 focus:outline-none"
      />
    </div>
  );
}

export default Input;
