interface StatusLabelsProps {
  isPost: boolean;
  isSale: boolean;
  isFree: boolean;
  setIsPost: (arg: boolean) => void;
  setIsSale: (arg: boolean) => void;
  setIsFree: (arg: boolean) => void;
}

function StatusLabels({ isPost, isSale, isFree, setIsPost, setIsSale, setIsFree }: StatusLabelsProps) {
  return (
    <div>
      {isPost ? (
        <button className="status-label font-bold text-primary" onClick={() => setIsPost(!isPost)}>
          게시용
        </button>
      ) : (
        <button className="status-label" onClick={() => setIsPost(!isPost)}>
          게시용
        </button>
      )}
      {isSale ? (
        <button className="status-label font-bold text-primary" onClick={() => setIsSale(!isSale)}>
          판매용
        </button>
      ) : (
        <button className="status-label" onClick={() => setIsSale(!isSale)}>
          판매용
        </button>
      )}
      {isFree ? (
        <button className="status-label font-bold text-primary" onClick={() => setIsFree(!isFree)}>
          나눔용
        </button>
      ) : (
        <button className="status-label" onClick={() => setIsFree(!isFree)}>
          나눔용
        </button>
      )}
    </div>
  );
}

export default StatusLabels;
