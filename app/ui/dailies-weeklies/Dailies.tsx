"use client";
import { useState, useEffect, ReactElement } from "react";
import { DailiesProps } from "@/app/lib/definitions/dailies-weeklies-definitions";
import { Character, Daily } from "@/app/lib/definitions/general-definitions";
import Pagination from "./Pagination";
import DailiesCard from "./DailiesCard";

export default function Dailies({ charactersProp }: DailiesProps) {
  const [characters, setCharacters] = useState<Character[]>(charactersProp);
  const [filter, setFilter] = useState<string>("");
  const [dailiesCards, setDailiesCards] = useState<ReactElement[]>([]);
  const [currentPagePagination, setCurrentPagePagination] = useState<number>(1);
  const [totalPagesPagination, setTotalPagesPagination] = useState<number>(1);

  useEffect(() => {
    if (!filter) {
      setCharacters(charactersProp);
    } else {
      const newCharacters: Character[] = JSON.parse(
        JSON.stringify(
          charactersProp.filter((character) => {
            return character.dailies.find(
              (daily) => daily.description === filter,
            );
          }),
        ),
      );

      newCharacters.forEach((character) => {
        const filteredDaily: Daily | undefined = character.dailies.find(
          (daily) => daily.description === filter,
        );

        if (filteredDaily) {
          const newDailies: Daily[] = [];
          newDailies.push(filteredDaily);
          character.dailies = newDailies;
        }
      });

      setCharacters(newCharacters);
    }
  }, [filter]);

  useEffect(() => {
    setTotalPagesPagination(Math.ceil(characters.length / 10));
  }, [characters]);

  useEffect(() => {
    if (characters.length > 0) {
      const dailiesCardsArray: ReactElement[] = [];
      const firstIndex = (currentPagePagination - 1) * 10;
      const lastIndex = Math.min(10 * currentPagePagination, characters.length);

      for (let i = firstIndex; i < lastIndex; i++) {
        if (characters[i].dailies.length === 0) {
          continue;
        }

        dailiesCardsArray.push(
          <DailiesCard
            key={characters[i].characterId}
            character={characters[i]}
            dailies={characters[i].dailies}
            filter={filter}
          />,
        );
      }

      setDailiesCards(dailiesCardsArray);
    }
  }, [characters, currentPagePagination]);

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
