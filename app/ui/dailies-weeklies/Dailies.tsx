"use client";
import { useState, useEffect, ReactElement } from "react";
import { DailiesProps } from "@/app/lib/definitions/dailies-weeklies-definitions";
import { Character, Daily } from "@/app/lib/definitions/general-definitions";
import Pagination from "./Pagination";
import DailiesCard from "./DailiesCard";
import DailiesFilter from "./DailiesFilter";

export default function Dailies({
  dailiesCharacters,
  setDailiesCharacters,
}: DailiesProps) {
  const [characters, setCharacters] = useState<Character[]>(dailiesCharacters);
  const [filter, setFilter] = useState<string>("");
  const [dailiesCards, setDailiesCards] = useState<ReactElement[]>([]);
  const [currentPagePagination, setCurrentPagePagination] = useState<number>(1);
  const [totalPagesPagination, setTotalPagesPagination] = useState<number>(1);
  const [uniqueDailies, setUniqueDailies] = useState<string[]>([]);

  useEffect(() => {
    const newUniqueDailies = new Set<string>();

    for (const character of dailiesCharacters) {
      for (const daily of character.dailies) {
        newUniqueDailies.add(daily.description);
      }
    }

    setUniqueDailies(Array.from(newUniqueDailies));
  }, []);

  useEffect(() => {
    if (!filter) {
      setCharacters(dailiesCharacters);
    } else {
      const newCharacters: Character[] = JSON.parse(
        JSON.stringify(
          dailiesCharacters.filter((character) => {
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
        dailiesCardsArray.push(
          <DailiesCard
            key={characters[i].characterId}
            character={characters[i]}
            dailies={characters[i].dailies}
            filter={filter}
            dailiesCharacters={dailiesCharacters}
            setDailiesCharacters={setDailiesCharacters}
          />,
        );
      }

      setDailiesCards(dailiesCardsArray);
    } else {
      setDailiesCards([]);
    }
  }, [characters, currentPagePagination]);

  return (
    <div className="collapse collapse-open w-[32vw] bg-primary pb-3">
      <div className="flex items-center justify-between">
        <div className="collapse-title mb-1 pb-0 pt-3">
          <span className="text-4xl font-medium text-info underline-offset-8 underline-dreamy-neutral">
            Dailies
          </span>
        </div>
        {uniqueDailies.length > 0 && (
          <DailiesFilter
            uniqueDescriptions={uniqueDailies}
            setFilter={setFilter}
          />
        )}
      </div>
      <div className="flex gap-8 px-4">
        <div className="grid h-full w-full grid-flow-col grid-cols-2 grid-rows-5 items-center justify-items-center gap-4">
          {dailiesCards.length > 0 &&
            dailiesCards.map((dailiesCard) => dailiesCard)}
        </div>
        <Pagination
          id="dailies"
          currentPagePagination={currentPagePagination}
          setCurrentPagePagination={setCurrentPagePagination}
          totalPagesPagination={totalPagesPagination}
        />
      </div>
    </div>
  );
}
