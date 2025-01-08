"use client";
import { useState, useEffect, ReactElement } from "react";
import { BossesListProps } from "@/app/lib/definitions/bosses-definitions";
import BossesListCard from "./BossesListCard";

export default function BossesList({
  currentPageBossesList,
  bossesInfo,
  region,
}: BossesListProps) {
  const [bossesListCards, setBossesListCards] = useState<ReactElement[]>([]);

  useEffect(() => {
    if (currentPageBossesList.length > 0) {
      const bossesListCardsArray: ReactElement[] = [];

      for (const boss_position of currentPageBossesList) {
        bossesListCardsArray.push(
          <BossesListCard
            key={Math.random()}
            meso={
              region === "GMS"
                ? bossesInfo[boss_position].gms_meso
                : bossesInfo[boss_position].msea_meso
            }
            image={bossesInfo[boss_position].bosses_image}
          />,
        );
      }

      setBossesListCards(bossesListCardsArray);
    }
  }, [currentPageBossesList]);

  return (
    <div className="col-span-1 col-start-2 row-span-1 row-start-2 grid grid-cols-[0.7fr_0.3fr] grid-rows-7 items-center justify-items-center gap-y-2 px-4 py-1">
      {bossesListCards.length > 0 &&
        bossesListCards.map((bossesListCard) => bossesListCard)}
    </div>
  );
}
