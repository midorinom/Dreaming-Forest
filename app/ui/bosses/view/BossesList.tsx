"use client";
import { BossesListProps } from "@/app/lib/definitions/bosses-definitions";
import BossesListCard from "./BossesListCard";

export default function BossesList({
  bossesList,
  bossesInfo,
}: BossesListProps) {
  return (
    <div className="col-span-1 row-span-1 row-start-2 grid grid-cols-[0.7fr_0.3fr] grid-rows-7 items-center justify-items-center gap-y-2 p-1 px-4">
      <BossesListCard
        meso={bossesInfo[bossesList[0]].meso}
        image={bossesInfo[bossesList[0]].dashboard_image}
      />
      <BossesListCard
        meso={bossesInfo[bossesList[1]].meso}
        image={bossesInfo[bossesList[1]].dashboard_image}
      />
      <BossesListCard
        meso={bossesInfo[bossesList[2]].meso}
        image={bossesInfo[bossesList[2]].dashboard_image}
      />
      <BossesListCard
        meso={bossesInfo[bossesList[3]].meso}
        image={bossesInfo[bossesList[3]].dashboard_image}
      />
      <BossesListCard
        meso={bossesInfo[bossesList[4]].meso}
        image={bossesInfo[bossesList[4]].dashboard_image}
      />
      <BossesListCard
        meso={bossesInfo[bossesList[5]].meso}
        image={bossesInfo[bossesList[5]].dashboard_image}
      />
      <BossesListCard
        meso={bossesInfo[bossesList[6]].meso}
        image={bossesInfo[bossesList[6]].dashboard_image}
      />
    </div>
  );
}
