import NavBar from '@/components/NavBar/NavBar';
import NavigatorBox from '@/components/NavBar/NavigatorBox';
import SideBar from '@/components/SideBar/SideBar';
import MainContainer from './MyPage/MainContainer';

function MyPage() {
  return (
    <>
      <NavBar>
        <NavigatorBox />
      </NavBar>
      <SideBar id={13} displayStatus="myWork" />
      <MainContainer />
    </>
  );
}

export default MyPage;
