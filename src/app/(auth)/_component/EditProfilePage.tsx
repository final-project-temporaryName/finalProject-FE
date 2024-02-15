import NavBar from '@/components/NavBar/NavBar';
import NavigatorBox from '@/components/NavBar/NavigatorBox';
import ProfilePage from '@/components/ProfilePage/ProfilePage';

function EditProfilePage() {
  return (
    <div className="h-100dvh w-100dvw bg-white">
      <NavBar>
        <NavigatorBox />
      </NavBar>
      <ProfilePage mode="edit" />
    </div>
  );
}

export default EditProfilePage;
