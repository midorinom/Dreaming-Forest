"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { CharacterCardProps } from "@/app/lib/definitions/characters-definitions";
import type { Character } from "@/app/lib/definitions/general-definitions";
import CharacterDetails from "./CharacterDetails";
import CharacterTracking from "./CharacterTracking";
import CharacterCardEdit from "./CharacterCardEdit";

export default function CharacterCard({
  characterProp,
  characters,
  setCharacters,
}: CharacterCardProps) {
  const [character, setCharacter] = useState<Character>(characterProp);
  const [headingHovered, setHeadingHovered] = useState<boolean>(false);
  const [editClicked, setEditClicked] = useState<boolean>(false);

  useEffect(() => {
    if (
      character.ign === characterProp.ign &&
      character.level === characterProp.level &&
      character.image === characterProp.image &&
      character.maplestoryClass === characterProp.maplestoryClass
    ) {
      return;
    }

    const newCharacters = [...characters];
    newCharacters[character.position] = character;
    setCharacters(newCharacters);
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
          character={character}
          setEditClicked={setEditClicked}
          setCharacter={setCharacter}
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
