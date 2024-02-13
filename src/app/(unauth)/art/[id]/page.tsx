import Main from '../../_components/Main';
import RedirectToArt from '../_components/RedirectToArt';

export default async function Art() {
  return (
    <>
      <RedirectToArt />
      {/* Home은 추후 현재 열려 있는 페이지에 맞게 변경 예정 */}
      <Main />
    </>
  );
}
