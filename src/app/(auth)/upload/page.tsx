import Home from '../mypage/page';
import RedirectToUpload from './_component/RedirectToUpload';

export default async function Login() {
  return (
    <>
      <RedirectToUpload />
      <Home />
    </>
  );
}
