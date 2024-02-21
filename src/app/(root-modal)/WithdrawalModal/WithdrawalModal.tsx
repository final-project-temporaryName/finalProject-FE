'use client';

import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

function WithdrawalModal() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const inputValue = watch('confirmation');

  const clearModal = useStore((state) => state.clearModal);

  const disableButton = inputValue !== '청춘 탈퇴';

  const onSubmit = () => {
    router.replace('/');
    // 회원 탈퇴 api 연결
  };

  return (
    <div
      className="flex-center fixed bottom-0 left-0 right-0 top-0 z-infinite h-full w-screen bg-[#00000066]"
      onClick={clearModal}
    >
      <div className="deleteModal" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col gap-20">
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
            <button
              type="submit"
              className={`storage-button flex-center inline-block shrink-0 rounded-lg text-14 ${disableButton ? 'disabled' : ''}`}
              disabled={!inputValue}
            >
              영구탈퇴하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WithdrawalModal;
