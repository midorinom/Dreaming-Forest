"use client";
import { useState, useEffect, ReactElement } from "react";
import { DailiesProps } from "@/app/lib/definitions/dailies-weeklies-definitions";
import { Character } from "@/app/lib/definitions/general-definitions";
import Pagination from "./Pagination";
import DailiesCard from "./DailiesCard";

export default function Dailies({ characters }: DailiesProps) {
  const [filteredCharacters, setFilteredCharacters] =
    useState<Character[]>(characters);
  const [dailiesCards, setDailiesCards] = useState<ReactElement[]>([]);
  const [currentPagePagination, setCurrentPagePagination] = useState<number>(1);
  const [totalPagesPagination, setTotalPagesPagination] = useState<number>(1);

  useEffect(() => {
    setTotalPagesPagination(Math.ceil(filteredCharacters.length / 10));
  }, [filteredCharacters]);

  useEffect(() => {
    if (filteredCharacters.length > 0) {
      const dailiesCardsArray: ReactElement[] = [];
      const firstIndex = (currentPagePagination - 1) * 10;
      const lastIndex = Math.min(
        10 * currentPagePagination,
        filteredCharacters.length,
      );

      for (let i = firstIndex; i < lastIndex; i++) {
        dailiesCardsArray.push(
          <DailiesCard
            key={filteredCharacters[i].characterId}
            character={filteredCharacters[i]}
          />,
        );
      }

      setDailiesCards(dailiesCardsArray);
    }
  }, [filteredCharacters, currentPagePagination]);

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
      <div className="flex gap-8 px-4">
        <div className="grid h-full w-full grid-flow-col grid-cols-2 grid-rows-5 items-center justify-items-center gap-4">
          {dailiesCards.length > 0 &&
            dailiesCards.map((dailiesCard) => dailiesCard)}
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
