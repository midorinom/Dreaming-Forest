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
      const newDailies = [...dailies];
      newDailies[daily.position] = daily;
      setDailies(newDailies);
    }
  }, [daily]);

  function removeDaily() {
    const newDailies = [];

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

  return (
    <div className="flex w-full items-center justify-around">
      <Image
        src="/general/ui_icons/dots_icon.png"
        height={0}
        width={0}
        alt="Rearrange Button"
        sizes="100vw"
        className="h-[1.5rem] w-[auto] hover:cursor-pointer"
      />
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
