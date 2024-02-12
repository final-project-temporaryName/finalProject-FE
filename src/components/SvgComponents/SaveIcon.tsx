function SaveIcon({ onClick, className }: { onClick?: () => void; className?: string }) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
    >
      <g clipPath="url(#clip0_1812_5568)">
        <path
          d="M18.49 5.49951H7.60107V19.4995H21.6011V8.61062L18.49 5.49951ZM14.6011 17.944C13.31 17.944 12.2677 16.9017 12.2677 15.6106C12.2677 14.3195 13.31 13.2773 14.6011 13.2773C15.8922 13.2773 16.9344 14.3195 16.9344 15.6106C16.9344 16.9017 15.8922 17.944 14.6011 17.944ZM16.9344 10.1662H9.15663V7.05507H16.9344V10.1662Z"
          fill="#A0A0A0"
        />
      </g>
      <defs>
        <clipPath id="clip0_1812_5568">
          <rect width="24" height="24" fill="white" transform="translate(0.101074 -0.000488281)" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SaveIcon;
