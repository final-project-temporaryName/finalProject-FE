import SignUpProfilePage from '@/components/ProfilePage/SignUpProfilePage';
import '@/styles/tailwind.css';
import Image from 'next/image';
import loginBgImg from '../../../../public/assets/images/loginBg.png';

function SignUpPage() {
  return (
    <>
      <div className="flex h-dvh w-dvw flex-col justify-start">
        <div className="relative h-[15%] w-dvw flex-shrink-0">
          <Image src={loginBgImg} alt="로그인 페이지 사진" fill priority />
        </div>
        <div className="flex-col-center mt-45">
          <p className="text-26 font-bold md:text-20">나를 표현할 수 있는 프로필을 완성해요✨</p>
          <p className="text-16 md:text-14">
            <span className="text-primary">아트톡톡</span>을 통해 소통할 프로필을 작성해요!
          </p>
        </div>
        <SignUpProfilePage/>
      </div>
    </>
  );
}

export default SignUpPage;
