"use client";
import { useState, useEffect, ReactElement } from "react";
import { CheckboxesProps } from "@/app/lib/definitions/bosses-definitions";
import { Boss } from "@/app/lib/definitions/general-definitions";
import CheckboxCard from "./CheckboxCard";

export default function Checkboxes({
  currentPageBossesList,
  currentPageCharacters,
  setCharacters,
  region,
  data,
  setData,
  charactersPage,
  bossesInfo,
  totalMeso,
  setTotalMeso,
  setRowHovered,
}: CheckboxesProps) {
  const [checkboxCards, setCheckboxCards] = useState<ReactElement[]>([]);

  useEffect(() => {
    if (currentPageBossesList.length > 0 && currentPageCharacters.length > 0) {
      const checkboxCardsArray: ReactElement[] = [];

      // Rows
      for (let i = 0; i < 7; i++) {
        // Columns
        for (let j = 0; j < 5; j++) {
          const character = currentPageCharacters[j];
          let boss: Boss | undefined = undefined;
          let characterPosition: number = -1;

          if (character) {
            characterPosition = character.position;
            boss = character.bosses.find(
              (boss) => boss.bossesPosition === currentPageBossesList[i],
            );
          }

          checkboxCardsArray.push(
            <CheckboxCard
              key={`row_${i}_col_${j}`}
              boss={boss}
              region={region}
              characterPosition={characterPosition}
              setCharacters={setCharacters}
              data={data}
              setData={setData}
              charactersPage={charactersPage}
              row={i}
              column={j}
              bossesInfo={bossesInfo}
              totalMeso={totalMeso}
              setTotalMeso={setTotalMeso}
              setRowHovered={setRowHovered}
            />,
          );
        }
      }

      setCheckboxCards(checkboxCardsArray);
    }
  }, [data, currentPageBossesList, currentPageCharacters]);

  return (
    <div className="collapse relative col-span-1 col-start-3 row-span-1 row-start-2 mx-auto mb-1 h-[99%] w-[96.5%] grid-cols-5 grid-rows-7 items-center justify-items-center self-center bg-primary/85">
      {checkboxCards.length > 0 &&
        checkboxCards.map((checkboxCard) => checkboxCard)}
    </div>
  );
}
