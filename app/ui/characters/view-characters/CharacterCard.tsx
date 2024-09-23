"use client";
import { useState, useEffect, useRef } from "react";
import type { CharacterCardProps } from "@/app/lib/definitions/characters-definitions";
import type {
  Character,
  User,
} from "@/app/lib/definitions/general-definitions";
import CharacterDetails from "./CharacterDetails";
import CharacterTracking from "./CharacterTracking";

export default function CharacterCard({ characterProp }: CharacterCardProps) {
  const isMounted = useRef(false);
  const [character, setCharacter] = useState<Character>(characterProp);

  function isPrimaryBackground(): boolean {
    if (character.position % 4 === 0 || 3) {
      return true;
    }

    return false;
  }

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const localUser = localStorage.getItem("user");

    if (localUser) {
      const newUser: User = JSON.parse(localUser);
      newUser.characters[character.position] = character;
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  }, [character]);

  return (
    <>
      {character && (
        <div
          className={`grid h-[84%] w-[83%] grid-rows-[25vh_1fr] justify-items-center rounded-3xl ${isPrimaryBackground() ? "bg-primary/75" : "bg-secondary/75"}`}
        >
          <CharacterDetails character={character} />
          <CharacterTracking
            trackingProp={character.tracking}
            character={character}
            setCharacter={setCharacter}
          />
        </div>
      )}
    </>
  );
}
