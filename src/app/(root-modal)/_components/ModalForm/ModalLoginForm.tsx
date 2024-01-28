'use client';

import '@/styles/tailwind.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@/components/Button';
import Modal from '..';

interface Props {
  style: string;
}

export default function ModalLoginForm({ style }: Props) {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();

  const { register, handleSubmit } = useForm();

  const onValid = () => {};

  return (
    <form className={`${style}`} onSubmit={handleSubmit(onValid)}>
      <div className="flex-1 px-80">
        <Modal.Input.Login htmlFor="id" value={id} placeholder={''} label="아이디" register={register('id')} />
        <Modal.Input.Login
          htmlFor="password"
          value={password}
          placeholder={''}
          label="비밀번호"
          register={register('password')}
        />
      </div>
      <div className="flex justify-center font-bold text-primary">{message}</div>
      <Button.Modal.Action wrapperStyle="px-80 py-24" buttonStyle="modal-action-button" disabled={!id && !password}>
        로그인하기
      </Button.Modal.Action>
    </form>
  );
}
