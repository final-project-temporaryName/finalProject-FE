import Link from 'next/link';

interface Props {
  text: string;
}

function InfiniteText({ text }: Props) {
  return (
    <Link href={'/'}>
      <div id="flow-container" className="bg-primary py-8">
        <div
          id="flow-text"
          className="group flex flex-[0_0_auto] overflow-hidden whitespace-nowrap text-16 font-bold text-white transition-[0.3s] hover:cursor-pointer hover:text-black"
        >
          <div id="flow-wrap" className="group-hover:animate-pause animate-textLoop pr-[1.488vw]">
            {text}
          </div>
          <div id="flow-wrap" className="group-hover:animate-pause animate-textLoop pr-[1.488vw]">
            {text}
          </div>
          <div id="flow-wrap" className="group-hover:animate-pause animate-textLoop pr-[1.488vw]">
            {text}
          </div>
          <div id="flow-wrap" className="group-hover:animate-pause animate-textLoop pr-[1.488vw]">
            {text}
          </div>
          <div id="flow-wrap" className="group-hover:animate-pause animate-textLoop pr-[1.488vw]">
            {text}
          </div>
          <div id="flow-wrap" className="group-hover:animate-pause animate-textLoop pr-[1.488vw]">
            {text}
          </div>
          <div id="flow-wrap" className="group-hover:animate-pause animate-textLoop pr-[1.488vw]">
            {text}
          </div>
          <div id="flow-wrap" className="group-hover:animate-pause animate-textLoop pr-[1.488vw]">
            {text}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default InfiniteText;
