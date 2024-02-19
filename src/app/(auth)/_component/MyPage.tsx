import SideBar from '@/components/SideBar/SideBar';
import MainContainer from './MyPage/MainContainer';

function MyPage() {
  return (
    <>
      <SideBar displayStatus="myWork" />
      <MainContainer />
    </>
  );
}

export default MyPage;
