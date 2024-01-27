import Home from '@/app/(unauth)/page';
import RedirectToLogin from './_components/RedirectToLogin';

export default async function Login() {
  return (
    <>
      <RedirectToLogin />
      <Home />
    </>
  );
}
