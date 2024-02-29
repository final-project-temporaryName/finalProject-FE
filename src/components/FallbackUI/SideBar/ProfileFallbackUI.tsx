export default function ProfileFallbackUI() {
  return (
    <div className="animate-pulse">
      <div className="fixed ml-35 h-700 w-260 rounded-sm md:relative md:ml-0 md:mt-110 md:h-270 md:w-full">
        <div className="absolute -top-55 left-1/2 z-first h-120 w-120 -translate-x-1/2 transform rounded-full md:-top-5">
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-1 border-solid border-gray-4 bg-gray-2 hover:border-primary-3"></div>
        </div>
        <div className="absolute top-5 flex h-full w-260 flex-col items-center rounded-[12px] bg-gray-1 md:top-55 md:h-227 md:w-full">
          <div className="mt-70 flex h-full w-192 flex-col items-center md:relative"></div>
        </div>
      </div>
    </div>
  );
}
