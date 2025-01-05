"use client";

export default function Weeklies() {
  return (
    <div className="collapse collapse-open w-[32vw] gap-2 bg-secondary pb-3">
      <div className="collapse-title mb-1 pb-0 pt-3">
        <div className="flex gap-2">
          <span className="text-4xl font-medium text-info underline-offset-8 underline-dreamy-neutral">
            Weeklies
          </span>
        </div>
      </div>
      <div className="absolute right-4 top-2 text-2xl text-info">filter</div>
    </div>
  );
}
