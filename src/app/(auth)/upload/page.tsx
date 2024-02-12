import Main from '@/app/(unauth)/_components/Main';
import MyPage from '../_component/MyPage';
import ParallelChildren from './_component/ParallelChildren';
import RedirectToUpload from './_component/RedirectToUpload';

export default async function Upload() {
  return (
    <>
      <RedirectToUpload />
      <ParallelChildren main={<Main />}>
        <MyPage />
      </ParallelChildren>
    </>
  );
}
