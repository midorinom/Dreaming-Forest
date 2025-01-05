"use client";

import DailiesCard from "./DailiesCard";

export default function Dailies() {
  return (
    <div className="collapse collapse-open w-[32vw] gap-2 bg-primary pb-3">
      <div className="collapse-title mb-1 pb-0 pt-3">
        <div className="flex gap-2">
          <span className="text-4xl font-medium text-info underline-offset-8 underline-dreamy-neutral">
            Dailies
          </span>
        </div>
      </div>
      <div className="absolute right-4 top-2 text-2xl text-info">filter</div>
      <div className="grid grid-flow-col grid-cols-2 grid-rows-5 items-center justify-items-center gap-4">
        <DailiesCard />
        <DailiesCard />
        <DailiesCard />
        <DailiesCard />
        <DailiesCard />
        <DailiesCard />
      </div>
    </div>
  );
}
