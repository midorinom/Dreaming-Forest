"use client";
import { PaginationProps } from "@/app/lib/definitions/characters-definitions";

export default function Pagination({
  currentPage,
  currentPagePagination,
  setCurrentPagePagination,
  totalPagesPagination,
}: PaginationProps) {
  return (
    <div className="join join-vertical my-auto flex -translate-y-[3.5vh] flex-col">
      {currentPage === "view" && totalPagesPagination > 1 && (
        <>
          <input
            className="btn btn-info join-item btn-lg h-[10vh] outline outline-accent"
            type="radio"
            name="options"
            aria-label=""
            defaultChecked
          />
          <input
            className="btn btn-info join-item btn-lg h-[10vh] outline outline-accent"
            type="radio"
            name="options"
            aria-label=""
          />
        </>
      )}
    </div>
  );
}
