function CheckIcon({ onClick }: { onClick?: () => void; }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onClick={onClick}>
      <g clipPath="url(#clip0_1348_1346)">
        <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="#A0A0A0" />
      </g>
      <defs>
        <clipPath id="clip0_1348_1346">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default CheckIcon;
