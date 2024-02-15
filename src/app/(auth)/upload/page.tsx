import ArtistPage from '@/app/(unauth)/_components/ArtistPage';
import Main from '@/app/(unauth)/_components/Main';
import MyPage from '../_component/MyPage';
import ParallelChildren from './_component/ParallelChildren';
import RedirectToUpload from './_component/RedirectToUpload';

export default function Upload() {
  return (
    <>
      <RedirectToUpload />
      <ParallelChildren main={<Main />} artist={<ArtistPage />}>
        <MyPage />
      </ParallelChildren>
    </>
  );
}
