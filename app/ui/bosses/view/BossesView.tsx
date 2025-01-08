"use client";
import { useState } from "react";
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

  return (
    <div className="grid h-full w-full grid-cols-[20vw_1fr] grid-rows-[15vh_1fr_12vh]">
      <Characters
        characters={characters}
        setCurrentPageCharacters={setCurrentPageCharacters}
        charactersPage={charactersPage}
        setCharactersPage={setCharactersPage}
      />
      <div className="col-span-1 row-span-1 row-start-2 border-4 border-black"></div>
      <div className="col-start-2 row-span-1 row-start-2 border-4 border-white"></div>
      <div className="col-span-1 row-start-3 border-4 border-accent"></div>
      <div className="col-start-2 row-start-3 border-4 border-black"></div>
    </div>
  );
}
