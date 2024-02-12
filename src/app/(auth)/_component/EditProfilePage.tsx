import NavBar from '@/components/NavBar/NavBar';
import ProfilePage from '@/components/ProfilePage/ProfilePage';

function EditProfilePage() {
  return (
    <div className="h-100dvh w-100dvw bg-white">
      <NavBar />
      <ProfilePage type="put" />
    </div>
  );
}

export default EditProfilePage;
