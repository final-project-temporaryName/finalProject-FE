import MyPage from '@/app/(auth)/_component/MyPage';
import Main from '../../_components/Main';
import ParallelChildren from '../_components/ParallelChildren';
import RedirectToArt from '../_components/RedirectToArt';
import ArtistPage from '../../_components/ArtistPage';

export default function Art() {
  return (
    <>
      <RedirectToArt />
      <ParallelChildren main={<Main />} artist={<ArtistPage />}>
        <MyPage />
      </ParallelChildren>
    </>
  );
}
