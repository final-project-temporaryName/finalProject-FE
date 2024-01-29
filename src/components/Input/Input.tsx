'use client';

import { useForm } from 'react-hook-form';

interface Props {
  label: string;
  type: string;
}

function Input({ label, ...props }: Props) {
  return (
    <div className="mb-4 flex flex-col">
      <label className="">{label}</label>
      <input {...props} className="" />
    </div>
  );
}

export default Input;
