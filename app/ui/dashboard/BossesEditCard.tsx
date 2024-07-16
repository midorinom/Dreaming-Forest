"use client";
import { useState } from "react";
import Image from "next/image";
import type { BossesEditCardProps } from "@/app/lib/definitions/dashboard-definitions";
import type { Boss } from "@/app/lib/definitions/general-definitions";
import { v4 as uuidv4 } from "uuid";
import { UUID } from "crypto";
import dayjs from "dayjs";

export default function BossesEditCard({
  bossInfoProp,
  boss,
  bosses,
  setBosses,
}: BossesEditCardProps) {
  const [selected, setSelected] = useState<boolean>(boss ? true : false);

  function manageToggle() {
    // Define Variables
    let newBosses: Boss[] = [...bosses];
    const newBoss: Boss = {
      bossId: uuidv4() as UUID,
      dashboardPosition: bossInfoProp.dashboard_position,
      bossesPosition: bossInfoProp.bosses_position,
      done: null,
      partySize: 1,
    };

    // Manage Toggle and Update boss.done
    if (selected) {
      setSelected(false);
      newBosses.forEach((boss) => {
        if (boss.bossesPosition === bossInfoProp.bosses_position) {
          boss.done = null;
        }
      });
    } else {
      if (!boss) {
        newBosses.push(newBoss);
      } else {
        newBosses.forEach((boss) => {
          if (boss.bossesPosition === bossInfoProp.bosses_position) {
            boss.done = dayjs().toDate();
          }
        });
      }
      setSelected(true);
    }

    // Set Bosses
    setBosses(newBosses);
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
