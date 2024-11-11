"use client";
import { useState, useEffect, ReactElement } from "react";
import { DeleteCharactersProps } from "@/app/lib/definitions/characters-definitions";
import DeleteCharacterCard from "./DeleteCharacterCard";

export default function DeleteCharacters({
  characters,
  setCharacters,
  currentPagePagination,
}: DeleteCharactersProps) {
  const [characterCards, setCharacterCards] = useState<ReactElement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (characters.length > 0) {
      const characterCardsArray: ReactElement[] = [];
      const firstIndex = (currentPagePagination - 1) * 10;
      const lastIndex = Math.min(10 * currentPagePagination, characters.length);

      for (let i = firstIndex; i < lastIndex; i++) {
        characterCardsArray.push(
          <DeleteCharacterCard
            key={characters[i].characterId}
            characterProp={characters[i]}
            characters={characters}
            setCharacters={setCharacters}
            setIsLoading={setIsLoading}
          />,
        );
      }

      setCharacterCards(characterCardsArray);
    }
  }, [characters, currentPagePagination]);

  return (
    <div
      className={`${isLoading ? "flex" : "grid grid-cols-5 grid-rows-2"} items-center justify-items-center`}
    >
      {isLoading ? (
        <span className="loading loading-spinner mx-auto h-1/3 w-auto text-accent"></span>
      ) : (
        characterCards.length > 0 &&
        characterCards.map((charactersCard) => charactersCard)
      )}
    </div>
  );
}
