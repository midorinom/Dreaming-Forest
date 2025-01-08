"use client";
import { MesoTotalsProps } from "@/app/lib/definitions/bosses-definitions";

export default function MesoTotals({
  data,
  charactersPage,
  totalMeso,
}: MesoTotalsProps) {
  return (
    <div className="col-span-1 col-start-2 row-start-3 grid grid-cols-5 grid-rows-2 items-center justify-items-center p-0.5">
      <div className="col-span-1 row-span-1 row-start-1 w-3/4 rounded-md bg-secondary p-1 text-center text-xl">
        {data[charactersPage].subtotals[0].toLocaleString()}
      </div>
      <div className="col-span-1 row-span-1 row-start-1 w-3/4 rounded-md bg-secondary p-1 text-center text-xl">
        {data[charactersPage].subtotals[1].toLocaleString()}
      </div>
      <div className="col-span-1 row-span-1 row-start-1 w-3/4 rounded-md bg-secondary p-1 text-center text-xl">
        {data[charactersPage].subtotals[2].toLocaleString()}
      </div>
      <div className="col-span-1 row-span-1 row-start-1 w-3/4 rounded-md bg-secondary p-1 text-center text-xl">
        {data[charactersPage].subtotals[3].toLocaleString()}
      </div>
      <div className="col-span-1 row-span-1 row-start-1 w-3/4 rounded-md bg-secondary p-1 text-center text-xl">
        {data[charactersPage].subtotals[4].toLocaleString()}
      </div>
      <div className="col-span-1 row-start-2 w-3/4 rounded-md bg-base-100 p-1 text-center text-xl">
        {totalMeso.toLocaleString()}
      </div>
    </div>
  );
}
