"use client";
import Image from "next/image";
import type { BossesEditProps } from "@/app/lib/definitions/dashboard-definitions";
import BossesEditCard from "./BossesEditCard";

export default function BossesEdit({
  bossesInfo,
  bosses,
  setBosses,
  setEditBossesClicked,
}: BossesEditProps) {
  return (
    <div className={"pb3 collapse collapse-open w-4/5 gap-2 bg-base-100"}>
      <div className="collapse-title pb-0 pl-2 pr-5 pt-3">
        <div className="flex content-center">
          <Image
            src="/general/ui_icons/back_icon.png"
            height={0}
            width={0}
            alt="Back Button"
            sizes="100vw"
            className="absolute h-[2.75rem] w-[auto] hover:cursor-pointer"
            onClick={() => setEditBossesClicked(false)}
          />
          <div className="flex-grow"></div>
          <span className="text-4xl font-medium text-info underline-offset-8 underline-dreamy-neutral">
            Bosses
          </span>
          <div className="flex-grow"></div>
        </div>
      </div>
      {bossesInfo && (
        <div className="collapse-content grid max-h-[50vh] grid-cols-6 grid-rows-4 gap-7 px-11 pb-5 pt-2">
          {bossesInfo.map((bossInfo) => {
            const bossProp = bosses.find(
              (boss) => boss.dashboardPosition === bossInfo.dashboard_position,
            );

            return (
              <BossesEditCard
                key={bossInfo.bosses_position}
                bossInfoProp={bossInfo}
                boss={bossProp}
                bosses={bosses}
                setBosses={setBosses}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
