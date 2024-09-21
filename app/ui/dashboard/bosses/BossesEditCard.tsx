"use client";
import { useState } from "react";
import Image from "next/image";
import type { BossesEditCardProps } from "@/app/lib/definitions/dashboard-definitions";
import type { Boss } from "@/app/lib/definitions/general-definitions";
import { v4 as uuidv4 } from "uuid";
import { UUID } from "crypto";

export default function BossesEditCard({
  bossInfoProp,
  boss,
  bosses,
  setBosses,
}: BossesEditCardProps) {
  const [selected, setSelected] = useState<boolean>(boss ? true : false);

  function manageToggle() {
    let newBosses: Boss[] = [...bosses];

    if (selected) {
      const index = newBosses.findIndex((boss) => {
        if (boss.bossesPosition === bossInfoProp.bosses_position) {
          return true;
        }
      });
      newBosses.splice(index, 1);

      setSelected(false);
    } else {
      const newBoss: Boss = {
        bossId: uuidv4() as UUID,
        dashboardPosition: bossInfoProp.dashboard_position,
        bossesPosition: bossInfoProp.bosses_position,
        dashboardImage: bossInfoProp.dashboard_image,
        done: null,
        partySize: 1,
      };
      newBosses.push(newBoss);

      setSelected(true);
    }

    const sortedBosses = newBosses.sort((a, b) => {
      if (a.done !== b.done) {
        return a.done ? 1 : -1;
      }

      return a.bossesPosition - b.bossesPosition;
    });
    setBosses(sortedBosses);
  }

  return (
    <div className="inline-flex items-center justify-center">
      <Image
        src={bossInfoProp.dashboard_image}
        height={0}
        width={0}
        alt={bossInfoProp.dashboard_image}
        sizes="100vw"
        className={`${!selected && "grayscale"} h-auto max-h-[4.5rem] w-full hover:cursor-pointer`}
        onClick={manageToggle}
      />
    </div>
  );
}
