export default function ProfileFallbackUI() {
  return (
    <div className="animate-pulse">
      <div className="fixed left-36 top-110 h-648 w-260 rounded-sm">
        <div className="absolute -top-10 left-1/2 z-first h-120 w-120 -translate-x-1/2 transform rounded-full">
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-1 border-solid border-gray-4 bg-gray-2 hover:border-primary-3"></div>
        </div>
        <div className="absolute top-48 flex h-650 w-260 flex-col items-center rounded-[12px] bg-gray-1">
          <div className="mb-276 mt-100 flex h-650 w-192 flex-col items-center justify-center bg-gray-2"></div>
        </div>
      </div>
    </div>
  );
}
