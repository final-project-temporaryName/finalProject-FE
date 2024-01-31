import LoginPage from '../../_components/LoginPage';
import RedirectToHome from '../_components/RedirectToHome';

export default async function LoginFlow() {
  return (
    <>
      <RedirectToHome />
      <LoginPage />
    </>
  );
}
