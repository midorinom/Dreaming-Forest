"use client";
import { useState } from "react";
import { BossesEditProps } from "@/app/lib/definitions/bosses-definitions";
import { Character } from "@/app/lib/definitions/general-definitions";
import ActiveCharacter from "./ActiveCharacter";
import CharactersWheel from "./CharactersWheel";
import Editor from "./Editor";

export default function BossesEdit({
  bossesInfo,
  characters,
  setCharacters,
}: BossesEditProps) {
  const [activeCharacter, setActiveCharacter] = useState<Character>(
    characters[0],
  );

  return (
    <>
      <div className="grid h-full w-2/3 grid-rows-[20vh_1fr] justify-self-center p-4">
        <div className="row-span-1 row-start-1 flex justify-between p-2">
          <ActiveCharacter activeCharacter={activeCharacter} />
          <CharactersWheel
            activeCharacter={activeCharacter}
            setActiveCharacter={setActiveCharacter}
            charactersProp={characters}
          />
        </div>
        <Editor
          activeCharacter={activeCharacter}
          characters={characters}
          setCharacters={setCharacters}
          bossesInfo={bossesInfo}
        />
      </div>
    </>
  );
}
