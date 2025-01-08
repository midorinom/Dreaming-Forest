"use client";
import { useState, useEffect } from "react";
import { BossesViewProps } from "@/app/lib/definitions/bosses-definitions";
import { Character } from "@/app/lib/definitions/general-definitions";
import Characters from "./Characters";

export default function BossesView({
  bossesInfo,
  characters,
  setCharacters,
  region,
}: BossesViewProps) {
  const [currentPageCharacters, setCurrentPageCharacters] = useState<
    Character[]
  >([]);
  const [charactersPage, setCharactersPage] = useState<number>(1);

  useEffect(() => {
    if (characters.length > 0) {
      const newCurrentPageCharacters: Character[] = [];
      const firstIndex = (charactersPage - 1) * 5;
      const lastIndex = Math.min(5 * charactersPage, characters.length);

      for (let i = firstIndex; i < lastIndex; i++) {
        newCurrentPageCharacters.push(characters[i]);
      }

      setCurrentPageCharacters(newCurrentPageCharacters);
    }
  }, [characters, charactersPage]);

  return (
    <>
      {currentPageCharacters.length > 0 && (
        <div className="grid h-full w-full grid-cols-[20vw_1fr] grid-rows-[15vh_1fr_12vh]">
          <Characters
            characters={characters}
            currentPageCharacters={currentPageCharacters}
            charactersPage={charactersPage}
            setCharactersPage={setCharactersPage}
          />
          <div className="col-span-1 row-span-1 row-start-2 border-4 border-black"></div>
          <div className="col-start-2 row-span-1 row-start-2 border-4 border-white"></div>
          <div className="col-span-1 row-start-3 border-4 border-accent"></div>
          <div className="col-start-2 row-start-3 border-4 border-black"></div>
        </div>
      )}
    </>
  );
}
