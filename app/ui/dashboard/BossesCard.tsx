"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { BossesCardProps } from "@/app/lib/definitions/dashboard-definitions";
import type { Boss } from "@/app/lib/definitions/general-definitions";
import dayjs from "dayjs";

export default function BossesCard({
  boss,
  bosses,
  setBosses,
  datesProp,
}: BossesCardProps) {
  const [selected, setSelected] = useState<boolean>(boss.done ? true : false);

  function manageToggle() {
    let newBosses: Boss[] = [...bosses];

    if (selected) {
      newBosses.forEach((newBoss) => {
        if (newBoss.bossesPosition === boss.bossesPosition) {
          newBoss.done = null;
        }
      });
      setSelected(false);
    } else {
      newBosses.forEach((newBoss) => {
        if (newBoss.bossesPosition === boss.bossesPosition) {
          newBoss.done = dayjs().toDate();
        }
      });
      setSelected(true);
    }

    setBosses(newBosses);
  }

  useEffect(() => {
    if (boss.done) {
      if (dayjs(datesProp.now).isBefore(dayjs(datesProp.resetDate))) {
        setSelected(true);
      } else {
        const newBosses: Boss[] = [...bosses];
        newBosses.forEach((newBoss) => {
          if (newBoss.bossesPosition === boss.bossesPosition) {
            newBoss.done = null;
          }
        });
        setSelected(false);
      }
    }
  }, []);

  return (
    <div className="inline-flex items-center justify-center">
      <Image
        src={boss.dashboardImage}
        height={0}
        width={0}
        alt={boss.dashboardImage}
        sizes="100vw"
        className={`${!selected && "grayscale"} h-auto max-h-[4.5rem] w-full hover:cursor-pointer`}
        onClick={manageToggle}
      />
    </div>
  );
}
