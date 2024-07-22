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
  const primaryBackgroundIndexes = [0, 3, 4, 7, 8, 11, 12, 15, 16, 19];

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
          className={`grid h-[84%] w-[83%] grid-rows-[25vh_1fr] justify-items-center rounded-3xl ${!primaryBackgroundIndexes.includes(character.position) ? "bg-primary" : "bg-secondary"}`}
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
