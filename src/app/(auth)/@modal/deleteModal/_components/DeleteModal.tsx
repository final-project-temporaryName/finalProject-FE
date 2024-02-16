'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Modal from '../../../../(root-modal)/_components';
import Link from 'next/link';

function DeleteModal() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const inputValue = watch('confirmation');

  const onClickClose = () => {
    router.back();
  };

  const onSubmit = (data: any) => {
    console.log(data);
    // 회원 탈퇴 api 연결
  };

  return (
    <Modal.Container classname="deleteModal" onClickClose={onClickClose}>
      <Modal.Body classname="flex flex-col gap-20">
        <span className="flex-center text-14 font-bold">계정 탈퇴</span>
        <span className="text-14">청춘예찬 계정을 탈퇴하시려면 ‘청춘 탈퇴’를 입력해주세요</span>
        <form className="flex flex-row gap-40" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <input
              {...register('confirmation', {
                validate: {
                  match: (value) => value === '청춘 탈퇴' || '다시 입력해주세요',
                },
              })}
              className={`rounded-xs p-5 ${errors.confirmation ? 'border-red-500' : ''}`}
            />
            {errors.confirmation?.message && (
              <p className="text-12 text-[#C90000]">{String(errors.confirmation.message)}</p>
            )}
          </div>
          <Link href="/deleteUser">
            <button
              type="submit"
              className={'storage-button flex-center inline-block shrink-0 rounded-lg text-14'}
              disabled={!inputValue}
            >
              영구탈퇴하기
            </button>
          </Link>
        </form>
      </Modal.Body>
    </Modal.Container>
  );
}

export default DeleteModal;
