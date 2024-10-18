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
          <input
            key={i}
            value={i + 1}
            className={`btn btn-info ${i === 0 ? "" : "join-item"} btn-lg h-[10vh] outline outline-accent`}
            type="radio"
            name="options"
            aria-label=""
            defaultChecked={currentPagePagination === i + 1 ? true : false}
            onClick={changePage}
          />,
        );
      }
      setPaginationButtons(paginationButtonsArray);
    }
  }, [totalPagesPagination]);

  function changePage(e: React.MouseEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    setCurrentPagePagination(Number(target.value));
  }

  return (
    <div className="join join-vertical my-auto flex -translate-y-[3.5vh] flex-col">
      {(currentPage === "view" || currentPage === "delete") &&
        totalPagesPagination > 1 && (
          <>{paginationButtons.map((paginationButton) => paginationButton)}</>
        )}
    </div>
  );
}
