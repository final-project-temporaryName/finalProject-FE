import Sidebar from '../../components/SideBar/SideBar';

const Home: React.FC = () => {
  return (
    <>
      <div>
        <Sidebar
          name="Henzy"
          role="제품디자인 학부생/ 3D Modeling"
          description="캐릭터 드로잉 및 3D 모델 제품 작업합니다. (졸작 판매 중)"
          likes={230}
          followers={24}
        />
      </div>
    </>
  );
};

export default Home;
