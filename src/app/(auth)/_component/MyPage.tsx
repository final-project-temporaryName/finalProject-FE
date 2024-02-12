import CategoryButtonGroup from '@/components/Button/Category/CategoryButtonGroup';
import CardContainer from '@/components/Card/CardContainer';
import NavBar from '@/components/NavBar/NavBar';
import NavigatorBox from '@/components/NavBar/NavigatorBox';
import SideBar from '@/components/SideBar/SideBar';

function MyPage() {
  return (
    <>
      <NavBar>
        <NavigatorBox />
      </NavBar>
      <SideBar id={2} displayStatus="myWork" />
      <main className="ml-330 mt-157">
        <CategoryButtonGroup />
        <CardContainer />
      </main>
    </>
  );
}

export default MyPage;
