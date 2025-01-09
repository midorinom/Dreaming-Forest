"use client";
import { useState, useEffect, ReactElement } from "react";
import { BossesListProps } from "@/app/lib/definitions/bosses-definitions";
import BossesListCard from "./BossesListCard";

export default function BossesList({
  currentPageBossesList,
  bossesInfo,
  region,
  data,
  currentPageCharacters,
  charactersPage,
  totalMeso,
  setCharacters,
  setData,
  setTotalMeso,
  rowHovered,
}: BossesListProps) {
  const [bossesListCards, setBossesListCards] = useState<ReactElement[]>([]);

  useEffect(() => {
    if (currentPageBossesList.length > 0) {
      const bossesListCardsArray: ReactElement[] = [];

      for (let i = 0; i < currentPageBossesList.length; i++) {
        if (
          currentPageBossesList[i] === null ||
          currentPageBossesList[i] === undefined
        ) {
          break;
        }

        bossesListCardsArray.push(
          <BossesListCard
            key={`bosses_list_card_${i}`}
            meso={
              region === "GMS"
                ? bossesInfo[currentPageBossesList[i]].gms_meso
                : bossesInfo[currentPageBossesList[i]].msea_meso
            }
            image={bossesInfo[currentPageBossesList[i]].bosses_image}
            region={region}
            data={data}
            currentPageCharacters={currentPageCharacters}
            charactersPage={charactersPage}
            totalMeso={totalMeso}
            setCharacters={setCharacters}
            setData={setData}
            setTotalMeso={setTotalMeso}
            bossPosition={currentPageBossesList[i]}
            bossesInfo={bossesInfo}
            row={i}
            rowHovered={rowHovered}
          />,
        );
      }

      setBossesListCards(bossesListCardsArray);
    }
  }, [currentPageBossesList, currentPageCharacters, rowHovered]);

  return (
    <div className="col-span-1 col-start-2 row-span-1 row-start-2 mb-1 grid grid-cols-[0.7fr_0.3fr] grid-rows-7 items-center justify-items-center gap-y-2 px-4 py-1">
      {bossesListCards.length > 0 &&
        bossesListCards.map((bossesListCard) => bossesListCard)}
    </div>
  );
}
