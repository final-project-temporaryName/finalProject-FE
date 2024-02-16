import DeleteBox from '@/app/(auth)/deleteUser/_component/DeleteBox';
import NavBar from '@/components/NavBar/NavBar';
import NavigatorBox from '@/components/NavBar/NavigatorBox';

function DeleteUserPage() {
  return (
    <div className="h-100dvh w-100dvw bg-white">
      <NavBar>
        <NavigatorBox />
      </NavBar>
      <DeleteBox />
    </div>
  );
}

export default DeleteUserPage;
