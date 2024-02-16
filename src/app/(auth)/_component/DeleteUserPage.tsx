import DeleteBox from '@/app/(auth)/deleteUser/_component/DeleteBox';
import NavBar from '@/components/NavBar/NavBar';
import NavigatorBox from '@/components/NavBar/NavigatorBox';

function DeleteUserPage() {
  return (
    <>
      <NavBar>
        <NavigatorBox />
      </NavBar>
      <DeleteBox />
    </>
  );
}

export default DeleteUserPage;
