import SampleImage from '../../public/assets/images/CardSampleImage.png';
import Image from 'next/image';

function Card() {
  return (
    <div className="flex flex-col w-280 h-328">
      <div>
        <Image src={SampleImage} alt="카드 이미지" width={280} height={280} />
        <div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="flex items-center bg-primary-1 w-280 h-48">작가 닉네임</div>
    </div>
  );
}

export default Card;
