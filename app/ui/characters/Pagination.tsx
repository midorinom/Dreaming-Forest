"use client";
import { useState, useEffect, ReactElement } from "react";
import { PaginationProps } from "@/app/lib/definitions/characters-definitions";

export default function Pagination({
  currentPage,
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
              id={`option-${i}`}
              type="radio"
              name="options"
              aria-label=""
              className="peer hidden"
              checked={currentPagePagination === i + 1 ? true : false}
              onClick={changePage}
              readOnly={true}
            />
            <label
              htmlFor={`option-${i}`}
              className={`btn btn-info btn-lg h-[10vh] outline outline-[3.5px] outline-accent ${
                i === 0 ? "rounded-t-3xl" : "rounded-t-none"
              } ${
                i + 1 === totalPagesPagination
                  ? "rounded-b-3xl"
                  : "rounded-b-none"
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
      {currentPage !== "add" && totalPagesPagination > 1 && (
        <>{paginationButtons.map((paginationButton) => paginationButton)}</>
      )}
    </div>
  );
}
