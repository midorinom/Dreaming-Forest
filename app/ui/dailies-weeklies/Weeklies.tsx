"use client";
import { useState, useEffect, ReactElement } from "react";
import { WeekliesProps } from "@/app/lib/definitions/dailies-weeklies-definitions";
import { Character, Weekly } from "@/app/lib/definitions/general-definitions";
import Pagination from "./Pagination";
import WeekliesCard from "./WeekliesCard";

export default function Weeklies({ charactersProp }: WeekliesProps) {
  const [characters, setCharacters] = useState<Character[]>(charactersProp);
  const [filter, setFilter] = useState<string>("");
  const [weekliesCards, setWeekliesCards] = useState<ReactElement[]>([]);
  const [currentPagePagination, setCurrentPagePagination] = useState<number>(1);
  const [totalPagesPagination, setTotalPagesPagination] = useState<number>(1);

  useEffect(() => {
    if (!filter) {
      setCharacters(charactersProp);
    } else {
      const newCharacters: Character[] = JSON.parse(
        JSON.stringify(
          charactersProp.filter((character) => {
            return character.weeklies.find(
              (weekly) => weekly.description === filter,
            );
          }),
        ),
      );

      newCharacters.forEach((character) => {
        const filteredWeekly: Weekly | undefined = character.weeklies.find(
          (weekly) => weekly.description === filter,
        );

        if (filteredWeekly) {
          const newWeeklies: Weekly[] = [];
          newWeeklies.push(filteredWeekly);
          character.weeklies = newWeeklies;
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
      const weekliesCardsArray: ReactElement[] = [];
      const firstIndex = (currentPagePagination - 1) * 10;
      const lastIndex = Math.min(10 * currentPagePagination, characters.length);

      for (let i = firstIndex; i < lastIndex; i++) {
        if (characters[i].weeklies.length === 0) {
          continue;
        }

        weekliesCardsArray.push(
          <WeekliesCard
            key={characters[i].characterId}
            character={characters[i]}
            weeklies={characters[i].weeklies}
            filter={filter}
          />,
        );
      }

      setWeekliesCards(weekliesCardsArray);
    } else {
      setWeekliesCards([]);
    }
  }, [characters, currentPagePagination]);

  return (
    <div className="collapse collapse-open w-[32vw] gap-2 bg-secondary pb-3">
      <div className="collapse-title mb-1 pb-0 pt-3">
        <div className="flex gap-2">
          <span className="text-4xl font-medium text-info underline-offset-8 underline-dreamy-neutral">
            Weeklies
          </span>
        </div>
      </div>
      <div className="absolute right-4 top-2 text-2xl text-info">filter</div>
      <div className="flex gap-8 px-4">
        <div className="grid h-full w-full grid-flow-col grid-cols-2 grid-rows-5 items-center justify-items-center gap-4">
          {weekliesCards.length > 0 &&
            weekliesCards.map((weekliesCards) => weekliesCards)}
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
