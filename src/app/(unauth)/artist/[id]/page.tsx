import CategoryButtonGroup from '@/components/Button/Category/CategoryButtonGroup';
import CardContainer from '@/components/Card/CardContainer';
import NavBar from '@/components/NavBar/NavBar';
import NavigatorBox from '@/components/NavBar/NavigatorBox';
import SideBar from '@/components/SideBar/SideBar';

export default function Artist() {
  // navBar와 sideBar에 들어갈 id값은 페이지의 주소 query를 받아서 전달해야함
  return (
    <>
      <NavBar>
        <NavigatorBox />
      </NavBar>
      <SideBar id={2} displayStatus="notMyWork" />
      <main className="ml-330 mt-157">
        <CategoryButtonGroup />
        <CardContainer />
      </main>
    </>
  );
}
