"use client";
import { useState, useEffect, ReactElement } from "react";
import { BossesPaginationProps } from "@/app/lib/definitions/bosses-definitions";

export default function BossesPagination({
  bossesPage,
  setBossesPage,
  totalBossesPages,
}: BossesPaginationProps) {
  const [paginationButtons, setPaginationButtons] = useState<ReactElement[]>(
    [],
  );

  useEffect(() => {
    if (totalBossesPages > 1) {
      const paginationButtonsArray: ReactElement[] = [];

      for (let i = 0; i < totalBossesPages; i++) {
        paginationButtonsArray.push(
          <div key={i}>
            <input
              value={i}
              id={`$bosses-pagination-option-${i}`}
              type="radio"
              name="options"
              aria-label=""
              className="peer hidden"
              checked={bossesPage === i ? true : false}
              onClick={changePage}
              readOnly={true}
            />
            <label
              htmlFor={`$bosses-pagination-option-${i}`}
              className={`btn btn-info btn-sm w-[2.5vw] outline outline-accent ${
                i === 0 ? "rounded-l-3xl" : "rounded-l-none"
              } ${
                i + 1 === totalBossesPages ? "rounded-r-3xl" : "rounded-r-none"
              } peer-checked:border-accent peer-checked:bg-accent`}
            ></label>
          </div>,
        );
      }

      setPaginationButtons(paginationButtonsArray);
    }
  }, [totalBossesPages, bossesPage]);

  function changePage(e: React.MouseEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    setBossesPage(Number(target.value));
  }

  return (
    <div className="col-span-1 col-start-2 row-start-3 flex items-start justify-center">
      <div className="mx-auto mt-4 flex">
        {totalBossesPages > 1 && (
          <>{paginationButtons.map((paginationButton) => paginationButton)}</>
        )}
      </div>
    </div>
  );
}
