import RedirectToArt from '../_components/RedirectToArt';
import Home from '../../../(auth)/mypage/page';

export default async function Login() {
  return (
    <>
      <RedirectToArt />
      {/* Home은 추후 현재 열려 있는 페이지에 맞게 변경 예정 */}
      <Home />
    </>
  );
}
