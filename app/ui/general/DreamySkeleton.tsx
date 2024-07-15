export default function DreamySkeleton() {
  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-base-100"
      data-theme="dreamy"
    >
      <div className="flex h-4/5 w-4/5 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-32 w-32 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-80"></div>
            <div className="skeleton h-4 w-96"></div>
          </div>
        </div>
        <div className="skeleton h-full w-full"></div>
      </div>
    </div>
  );
}
