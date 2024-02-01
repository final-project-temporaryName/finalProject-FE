function PlusButtonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      className={className}
    >
      <g clipPath="url(#clip0_1348_1340)">
        <path
          d="M12 2.36938C6.48 2.36938 2 6.84938 2 12.3694C2 17.8894 6.48 22.3694 12 22.3694C17.52 22.3694 22 17.8894 22 12.3694C22 6.84938 17.52 2.36938 12 2.36938ZM17 13.3694H13V17.3694H11V13.3694H7V11.3694H11V7.36938H13V11.3694H17V13.3694Z"
          fill="#A0A0A0"
        />
      </g>
      <defs>
        <clipPath id="clip0_1348_1340">
          <rect width="24" height="24" fill="white" transform="translate(0 0.369385)" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default PlusButtonIcon;
