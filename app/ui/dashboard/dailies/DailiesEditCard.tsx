"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { DailiesEditCardProps } from "@/app/lib/definitions/dashboard-definitions";
import type { Daily } from "@/app/lib/definitions/general-definitions";
import DailyInput from "./DailyInput";

export default function DailiesEditCard({
  dailyProp,
  dailies,
  setDailies,
}: DailiesEditCardProps) {
  const [daily, setDaily] = useState<Daily>(dailyProp);

  useEffect(() => {
    if (daily) {
      const newDailies: Daily[] = [...dailies];
      newDailies[daily.position] = daily;
      setDailies(newDailies);
    }
  }, [daily]);

  function removeDaily() {
    const newDailies: Daily[] = [];

    for (const newDaily of dailies) {
      if (newDaily.position === dailyProp.position) {
        continue;
      }
      if (newDaily.position > dailyProp.position) {
        newDaily.position -= 1;
      }
      newDailies.push(newDaily);
    }

    setDailies(newDailies);
  }

  function moveDaily(offset: number) {
    const newDailies: Daily[] = [...dailies];

    newDailies[dailyProp.position + offset].position -= offset;
    newDailies[dailyProp.position].position += offset;
    newDailies.sort((a, b) => a.position - b.position);
    setDailies(newDailies);
  }

  return (
    <div className="flex w-full items-center justify-around">
      <div>
        {dailyProp.position !== 0 && (
          <Image
            src="/general/ui_icons/up_arrow_icon.png"
            height={0}
            width={0}
            alt="Up Arrow"
            sizes="100vw"
            className="h-[1.5rem] w-[auto] hover:cursor-pointer"
            onClick={() => moveDaily(-1)}
          />
        )}
        {dailyProp.position + 1 !== dailies.length && (
          <Image
            src="/general/ui_icons/down_arrow_icon.png"
            height={0}
            width={0}
            alt="Down Arrow"
            sizes="100vw"
            className="h-[1.5rem] w-[auto] hover:cursor-pointer"
            onClick={() => moveDaily(1)}
          />
        )}
      </div>
      {daily && <DailyInput daily={daily} setDaily={setDaily} />}
      <Image
        src="/general/ui_icons/minus_icon.png"
        height={0}
        width={0}
        alt="Delete Button"
        sizes="100vw"
        className="h-[2rem] w-[auto] hover:cursor-pointer"
        onClick={removeDaily}
      />
    </div>
  );
}
