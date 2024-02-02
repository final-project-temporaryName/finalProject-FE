interface Props {
  onClick?: any;
}

function BinIcon({ onClick }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" onClick={onClick}>
      <g clipPath="url(#clip0_1348_1343)">
        <path
          d="M18 5.64286H15L14.1429 4.78572H9.85714L9 5.64286H6V7.35715H18V5.64286ZM6.85714 8.21429V18.5C6.85714 19.4429 7.62857 20.2143 8.57143 20.2143H15.4286C16.3714 20.2143 17.1429 19.4429 17.1429 18.5V8.21429H6.85714Z"
          fill="#A0A0A0"
        />
      </g>
      <defs>
        <clipPath id="clip0_1348_1343">
          <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default BinIcon;
