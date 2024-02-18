import SideBar from '@/components/SideBar/SideBar';
import ArtistCardSection from './Artist/ArtistCardSection';

export default function ArtistPage() {
  return (
    <>
      <SideBar displayStatus="notMyWork" />
      <ArtistCardSection />
    </>
  );
}
