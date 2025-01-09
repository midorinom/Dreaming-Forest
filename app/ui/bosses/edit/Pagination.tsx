"use client";
import { useState, useEffect, ReactElement } from "react";
import { BossesPaginationProps } from "@/app/lib/definitions/bosses-definitions";

export default function Pagination({
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
              className={`btn btn-info btn-lg w-full outline outline-accent ${
                i === 0 ? "rounded-t-3xl" : "rounded-t-none"
              } ${
                i + 1 === totalBossesPages ? "rounded-b-3xl" : "rounded-b-none"
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
    <div className="col-start-2 flex justify-self-center">
      <div className="my-auto flex flex-col">
        {totalBossesPages > 1 && (
          <>{paginationButtons.map((paginationButton) => paginationButton)}</>
        )}
      </div>
    </div>
  );
}
