"use client";
import { useState, useEffect, ReactElement } from "react";
import { RearrangeCharactersProps } from "@/app/lib/definitions/characters-definitions";
import RearrangeCharacterCard from "./RearrangeCharacterCard";

export default function RearrangeCharacters({
  characters,
  currentPagePagination,
  setCharacters,
}: RearrangeCharactersProps) {
  const [characterCards, setCharacterCards] = useState<ReactElement[]>([]);

  useEffect(() => {
    if (characters.length > 0) {
      const characterCardsArray: ReactElement[] = [];
      const firstIndex = (currentPagePagination - 1) * 5;
      const lastIndex = Math.min(5 * currentPagePagination, characters.length);

      for (let i = firstIndex; i < lastIndex; i++) {
        characterCardsArray.push(
          <RearrangeCharacterCard
            key={characters[i].characterId}
            characterProp={characters[i]}
            characters={characters}
            setCharacters={setCharacters}
          />,
        );
      }

      setCharacterCards(characterCardsArray);
    }
  }, [characters, currentPagePagination]);

  return (
    <div className={"grid grid-cols-5 items-center justify-items-center p-4"}>
      {characterCards.length > 0 &&
        characterCards.map((charactersCard) => charactersCard)}
    </div>
  );
}
