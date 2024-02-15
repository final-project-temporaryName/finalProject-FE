import LoginPage from '../../_components/LoginPage';
import RedirectToHome from '../_components/RedirectToHome';

export default function LoginFlow() {
  return (
    <>
      <RedirectToHome />
      <LoginPage />
    </>
  );
}
