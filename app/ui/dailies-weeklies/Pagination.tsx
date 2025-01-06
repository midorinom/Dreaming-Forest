"use client";
import { useState, useEffect, ReactElement } from "react";
import { PaginationProps } from "@/app/lib/definitions/dailies-weeklies-definitions";

export default function Pagination({
  id,
  currentPagePagination,
  setCurrentPagePagination,
  totalPagesPagination,
}: PaginationProps) {
  const [paginationButtons, setPaginationButtons] = useState<ReactElement[]>(
    [],
  );

  useEffect(() => {
    if (totalPagesPagination > 1) {
      const paginationButtonsArray: ReactElement[] = [];

      for (let i = 0; i < totalPagesPagination; i++) {
        paginationButtonsArray.push(
          <div key={i}>
            <input
              value={i + 1}
              id={`${id}-option-${i}`}
              type="radio"
              name="options"
              aria-label=""
              className="peer hidden"
              checked={currentPagePagination === i + 1 ? true : false}
              onClick={changePage}
              readOnly={true}
            />
            <label
              htmlFor={`${id}-option-${i}`}
              className={`btn btn-info btn-md h-[10vh] outline outline-accent ${
                i !== 0 && "rounded-t-none"
              } ${
                i + 1 !== totalPagesPagination && "rounded-b-none"
              } peer-checked:border-accent peer-checked:bg-accent`}
            ></label>
          </div>,
        );
      }

      setPaginationButtons(paginationButtonsArray);
    }
  }, [totalPagesPagination, currentPagePagination]);

  function changePage(e: React.MouseEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    setCurrentPagePagination(Number(target.value));
  }

  return (
    <div className="my-auto flex flex-col">
      {totalPagesPagination > 1 && (
        <>{paginationButtons.map((paginationButton) => paginationButton)}</>
      )}
    </div>
  );
}
