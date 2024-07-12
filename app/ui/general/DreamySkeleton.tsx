export default function DreamySkeleton() {
  return (
    <div
      className="flex items-center justify-center w-full h-screen bg-base-100"
      data-theme="dreamy"
    >
      <div className="flex flex-col w-4/5 gap-4 h-4/5">
        <div className="flex items-center gap-4">
          <div className="w-32 h-32 rounded-full skeleton shrink-0"></div>
          <div className="flex flex-col gap-4">
            <div className="h-4 skeleton w-80"></div>
            <div className="h-4 skeleton w-96"></div>
          </div>
        </div>
        <div className="w-full h-full skeleton"></div>
      </div>
    </div>
  );
}
