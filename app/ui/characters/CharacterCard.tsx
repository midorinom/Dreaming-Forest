"use client";
import { useState } from "react";
import type { CharacterCardProps } from "@/app/lib/definitions/characters-definitions";
import type { Character } from "@/app/lib/definitions/general-definitions";
import CharacterDetails from "./CharacterDetails";
import CharacterTracking from "./CharacterTracking";

export default function CharacterCard({ characterProp }: CharacterCardProps) {
  const [character, setCharacter] = useState<Character>(characterProp);

  return (
    <div className="grid h-[85%] w-4/5 grid-rows-[25vh_1fr] justify-items-center rounded-3xl bg-primary">
      {character && (
        <>
          <CharacterDetails />
          <CharacterTracking trackingProp={character.tracking} />
        </>
      )}
    </div>
  );
}
