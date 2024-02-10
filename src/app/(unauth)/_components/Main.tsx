import InfiniteText from '@/components/InfiniteText';
import NavBar from '@/components/NavBar/NavBar';
import NavigatorBox from '@/components/NavBar/NavigatorBox';
import MainCardSection from './Main/MainCardSection';

function Main() {
  return (
    <>
      <InfiniteText text="ART TALK - TALK  🎉  SITE FOR THE ARTISTS  •  DESIGNERS  •  CREATORS  🙌  SHARE YOUR CREATIVITY  😎  " />
      <NavBar>
        <NavigatorBox />
      </NavBar>
      <MainCardSection />
    </>
  );
}

export default Main;
