"use client";
import { useState } from "react";
import { DailiesProps } from "@/app/lib/definitions/dailies-weeklies-definitions";
import Pagination from "./Pagination";
import DailiesCard from "./DailiesCard";

export default function Dailies({ characters }: DailiesProps) {
  const [currentPagePagination, setCurrentPagePagination] = useState<number>(1);
  const [totalPagesPagination, setTotalPagesPagination] = useState<number>(1);

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
      <div className="flex gap-4 px-4">
        <div className="grid h-full w-full grid-flow-col grid-cols-2 grid-rows-5 items-center justify-items-center gap-4">
          <DailiesCard />
          <DailiesCard />
          <DailiesCard />
          <DailiesCard />
          <DailiesCard />
          <DailiesCard />
          <DailiesCard />
          <DailiesCard />
          <DailiesCard />
          <DailiesCard />
        </div>
        <Pagination
          currentPagePagination={currentPagePagination}
          setCurrentPagePagination={setCurrentPagePagination}
          totalPagesPagination={totalPagesPagination}
        />
      </div>
    </div>
  );
}
