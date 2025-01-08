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
    <div className={"pb3 collapse collapse-open w-4/5 gap-2 bg-base-100/85"}>
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
        <div className="collapse-content grid max-h-[50vh] auto-rows-fr grid-cols-6 gap-7 px-8 pb-2 pt-3">
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
