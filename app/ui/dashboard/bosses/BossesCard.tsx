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
  resetDate,
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
          newBoss.done = resetDate;
        }
      });
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

  useEffect(() => {
    if (boss.done) {
      // Use month if the boss is Black Mage, otherwise use week
      if (
        dayjs(resetDate).diff(
          dayjs(boss.done),
          boss.dashboardPosition === 3 ? "month" : "week",
        ) < 1
      ) {
        setSelected(true);
      } else {
        const newBosses: Boss[] = [...bosses];
        newBosses.forEach((newBoss) => {
          if (newBoss.bossesPosition === boss.bossesPosition) {
            newBoss.done = null;
          }
        });
        setSelected(false);
        setBosses(newBosses);
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