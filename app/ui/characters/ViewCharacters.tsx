"use client";
import { useState } from "react";
import type { ViewCharactersProps } from "@/app/lib/definitions/characters-definitions";
import type { Character } from "@/app/lib/definitions/general-definitions";
import CharacterCard from "./CharacterCard";

export default function ViewCharacters({
  charactersProp,
}: ViewCharactersProps) {
  const [characters, setCharacters] = useState<Character[]>(charactersProp);

  return (
    <div className="grid grid-cols-2 grid-rows-2 items-center justify-items-center">
      {characters &&
        characters.map((character) => (
          <CharacterCard
            key={character.characterId}
            characterProp={character}
          />
        ))}
    </div>
  );
}
