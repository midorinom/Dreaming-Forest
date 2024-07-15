"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { DailiesCardProps } from "@/app/lib/definitions/dashboard-definitions";
import type { Daily } from "@/app/lib/definitions/general-definitions";
import DailyInput from "./DailyInput";

export default function DailiesCard({
  dailyProp,
  dailies,
  setDailies,
}: DailiesCardProps) {
  const [daily, setDaily] = useState<Daily>(dailyProp);

  useEffect(() => {
    if (daily) {
      const newDailies = [...dailies];
      newDailies[daily.position] = daily;
      setDailies(newDailies);
    }
  }, [daily]);

  return (
    <div className="flex w-full items-center">
      <div className="form-control">
        <label className="label flex cursor-pointer gap-3">
          <input
            type="checkbox"
            className="checkbox-accent checkbox checkbox-lg border-info"
          />
          <span className="label-text text-lg">{daily.description}</span>
        </label>
      </div>
    </div>
  );
}
