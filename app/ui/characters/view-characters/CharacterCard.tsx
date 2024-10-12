"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { CharacterCardProps } from "@/app/lib/definitions/characters-definitions";
import type {
  Character,
  User,
} from "@/app/lib/definitions/general-definitions";
import CharacterDetails from "./CharacterDetails";
import CharacterTracking from "./CharacterTracking";
import CharacterCardEdit from "./CharacterCardEdit";

export default function CharacterCard({
  characterProp,
  setCharacters,
}: CharacterCardProps) {
  const isMounted = useRef(false);
  const [character, setCharacter] = useState<Character>(characterProp);
  const [headingHovered, setHeadingHovered] = useState<boolean>(false);
  const [editClicked, setEditClicked] = useState<boolean>(false);

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

  function isPrimaryBackground(): boolean {
    if (character.position % 4 === 0 || character.position % 4 === 3) {
      return true;
    }

    return false;
  }

  return (
    <>
      {character && editClicked ? (
        <CharacterCardEdit
          characterProp={character}
          setEditClicked={setEditClicked}
        />
      ) : (
        <div
          className={`relative grid h-[84%] w-[83%] grid-rows-[24vh_1fr] justify-items-center ${character.position % 4 === 0 || character.position % 4 === 1 ? "self-end" : "self-start"} rounded-3xl ${isPrimaryBackground() ? "bg-primary/75" : "bg-secondary/75"}`}
          onMouseEnter={() => setHeadingHovered(true)}
          onMouseLeave={() => setHeadingHovered(false)}
        >
          {headingHovered && (
            <Image
              src="/general/ui_icons/edit_icon.png"
              height={0}
              width={0}
              alt="Edit Button"
              sizes="100vw"
              className="absolute right-2 top-2 h-[3rem] w-[auto] hover:cursor-pointer"
              onClick={() => setEditClicked(true)}
            />
          )}
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
