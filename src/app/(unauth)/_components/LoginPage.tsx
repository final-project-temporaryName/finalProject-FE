import Image from 'next/image';
import loginBgImg from '../../../../public/assets/images/LoginImage.png';
import KakaoLoginButton from '../login/_components/KakaoLoginButton';

import GoogleLoginButton from './GoogleLoginButton';

function LoginPage() {
  return (
    <>
      <div className="w-dvh flex h-dvh flex-col justify-start">
        <Image src={loginBgImg} alt="로그인 페이지 사진" className="w-dvh h-[65%]" />
        <article className="absolute top-[65%] flex w-381 flex-col items-center justify-start gap-28">
          <div className="w-full flex-col items-center gap-4">
            <h1 className="text-32 font-bold">반가워요✨</h1>
            <br />
            <p className="text-16">
              <span className="font-bold text-primary">청춘예찬</span>을 통해 여러 아티스트들과 소통하고
              <br />
              작품거래 및 공유로 트렌드를 만들어 보세요!
            </p>
          </div>
          <KakaoLoginButton />
        </article>
      </div>
    </>
  );
}

export default LoginPage;
