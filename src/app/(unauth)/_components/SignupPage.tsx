import Image from 'next/image';
import loginBgImg from '../../../../public/assets/images/loginBg.png';
import ProfilePage from '@/components/ProfilePage/ProfilePage';
import '@/styles/tailwind.css';

function SignUpPage() {
  return (
    <>
      <div className="flex h-dvh w-dvw flex-col justify-start">
        <div className="relative h-[15%] w-dvw">
          <Image src={loginBgImg} alt="로그인 페이지 사진" fill priority />
        </div>
        <div className="flex-col-center mt-45">
          <p className="md:text-26 text-20 font-bold">나를 표현할 수 있는 프로필을 완성해요✨</p>
          <p className="md:text-16 text-14">
            <span className="text-primary">아트톡톡</span>을 통해 소통할 프로필을 작성해요!
          </p>
        </div>
        <ProfilePage mode="create" />
      </div>
    </>
  );
}

export default SignUpPage;
