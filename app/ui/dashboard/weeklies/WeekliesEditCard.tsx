"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { WeekliesEditCardProps } from "@/app/lib/definitions/dashboard-definitions";
import type { Weekly } from "@/app/lib/definitions/general-definitions";
import WeeklyInput from "./WeeklyInput";
import WeeklyTimerSelect from "./WeeklyTimerSelect";

export default function WeekliesEditCard({
  resetDates,
  weeklyProp,
  weeklies,
  setWeeklies,
  region,
}: WeekliesEditCardProps) {
  const [weekly, setWeekly] = useState<Weekly>(weeklyProp);

  useEffect(() => {
    if (weekly) {
      const newWeeklies: Weekly[] = [...weeklies];
      newWeeklies[weekly.position] = weekly;
      setWeeklies(newWeeklies);
    }
  }, [weekly]);

  function removeWeekly() {
    const newWeeklies: Weekly[] = [];

    for (const newWeekly of weeklies) {
      if (newWeekly.position === weeklyProp.position) {
        continue;
      }
      if (newWeekly.position > weeklyProp.position) {
        newWeekly.position -= 1;
      }
      newWeeklies.push(newWeekly);
    }

    setWeeklies(newWeeklies);
  }

  return (
    <div className="flex w-full items-center justify-between">
      <div></div>
      {weekly && <WeeklyInput weekly={weekly} setWeekly={setWeekly} />}
      <WeeklyTimerSelect
        weekly={weekly}
        setWeekly={setWeekly}
        resetDates={resetDates}
        region={region}
      />
      <Image
        src="/general/ui_icons/minus_icon.png"
        height={0}
        width={0}
        alt="Delete Button"
        sizes="100vw"
        className="h-[2rem] w-[auto] hover:cursor-pointer"
        onClick={removeWeekly}
      />
    </div>
  );
}
