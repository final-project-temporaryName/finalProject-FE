import CategoryButtonGroup from '@/components/Button/Category/CategoryButtonGroup';
import NavBar from '@/components/NavBar/NavBar';
import SideBar from '@/components/SideBar/SideBar';
import CardContainer from '@/components/Card/CardContainer';

function MyPage() {
  return (
    <>
      <NavBar />
      <SideBar id={2} displayStatus="myWork" />
      <main className="ml-330 mt-157">
        <CategoryButtonGroup />
        <CardContainer />
      </main>
    </>
  );
}

export default MyPage;
