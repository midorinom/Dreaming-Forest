"use client";
import { useState, useEffect, ReactElement } from "react";
import Image from "next/image";
import { CharactersProps } from "@/app/lib/definitions/bosses-definitions";
import CharacterCard from "./CharacterCard";

export default function Characters({
  characters,
  currentPageCharacters,
  charactersPage,
  setCharactersPage,
  currentPageBossesList,
  setCharacters,
  region,
  data,
  setData,
  bossesInfo,
  totalMeso,
  setTotalMeso,
}: CharactersProps) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [characterCards, setCharacterCards] = useState<ReactElement[]>([]);

  useEffect(() => {
    if (currentPageCharacters.length > 0) {
      const characterCardsArray: ReactElement[] = [];

      for (let i = 0; i < currentPageCharacters.length; i++) {
        characterCardsArray.push(
          <CharacterCard
            key={currentPageCharacters[i].characterId}
            character={currentPageCharacters[i]}
            currentPageBossesList={currentPageBossesList}
            setCharacters={setCharacters}
            region={region}
            data={data}
            setData={setData}
            bossesInfo={bossesInfo}
            totalMeso={totalMeso}
            setTotalMeso={setTotalMeso}
            charactersPage={charactersPage}
            characterColumn={i}
          />,
        );
      }
      setCharacterCards(characterCardsArray);
    }
  }, [currentPageBossesList, currentPageCharacters]);

  return (
    <div
      className="relative col-span-1 col-start-3 row-span-1 flex h-full w-[96.5%] items-center justify-self-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && charactersPage > 0 && (
        <Image
          src={"/general/ui_icons/left_arrow_icon.png"}
          height={0}
          width={0}
          alt="Left Arrow Button"
          sizes="100vw"
          className="absolute left-[-1vw] z-10 h-[45%] w-auto hover:cursor-pointer"
          onClick={() => setCharactersPage(charactersPage - 1)}
        />
      )}
      {characterCards.length > 0 &&
        characterCards.map((charactersCard) => charactersCard)}
      {hovered && charactersPage + 1 < Math.ceil(characters.length / 5) && (
        <Image
          src={"/general/ui_icons/right_arrow_icon.png"}
          height={0}
          width={0}
          alt="Left Arrow Button"
          sizes="100vw"
          className="absolute right-[-1vw] z-10 h-[45%] w-auto hover:cursor-pointer"
          onClick={() => setCharactersPage(charactersPage + 1)}
        />
      )}
    </div>
  );
}
