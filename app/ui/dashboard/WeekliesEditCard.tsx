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

  function moveWeekly(offset: number) {
    const newWeeklies: Weekly[] = [...weeklies];

    newWeeklies[weeklyProp.position + offset].position -= offset;
    newWeeklies[weeklyProp.position].position += offset;
    newWeeklies.sort((a, b) => a.position - b.position);
    setWeeklies(newWeeklies);
  }

  return (
    <div className="flex w-full items-center justify-between">
      <div>
        {weeklyProp.position !== 0 && (
          <Image
            src="/general/ui_icons/up_arrow_icon.png"
            height={0}
            width={0}
            alt="Up Arrow"
            sizes="100vw"
            className="h-[1.5rem] w-[auto] hover:cursor-pointer"
            onClick={() => moveWeekly(-1)}
          />
        )}
        {weeklyProp.position + 1 !== weeklies.length && (
          <Image
            src="/general/ui_icons/down_arrow_icon.png"
            height={0}
            width={0}
            alt="Down Arrow"
            sizes="100vw"
            className="h-[1.5rem] w-[auto] hover:cursor-pointer"
            onClick={() => moveWeekly(1)}
          />
        )}
      </div>
      {weekly && <WeeklyInput weekly={weekly} setWeekly={setWeekly} />}
      <WeeklyTimerSelect
        weekly={weekly}
        setWeekly={setWeekly}
        resetDates={resetDates}
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
