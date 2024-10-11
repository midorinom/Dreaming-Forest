"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { CharacterCardEditProps } from "@/app/lib/definitions/characters-definitions";
import type {
  Character,
  User,
} from "@/app/lib/definitions/general-definitions";
import CharacterDetails from "./CharacterDetails";
import CharacterTracking from "./CharacterTracking";

export default function CharacterCardEdit({
  characterProp,
}: CharacterCardEditProps) {
  const isMounted = useRef(false);
  const [character, setCharacter] = useState<Character>(characterProp);

  function isPrimaryBackground(): boolean {
    if (character.position % 4 === 0 || character.position % 4 === 3) {
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
          className={`relative grid h-[84%] w-[83%] grid-rows-[24vh_1fr] justify-items-center ${character.position % 4 === 0 || character.position % 4 === 1 ? "self-end" : "self-start"} rounded-3xl ${isPrimaryBackground() ? "bg-primary/75" : "bg-secondary/75"}`}
        >
          <Image
            src="/general/ui_icons/back_icon.png"
            height={0}
            width={0}
            alt="Back Button"
            sizes="100vw"
            className="absolute left-2 top-2 h-[3rem] w-[auto] hover:cursor-pointer"
          />
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
