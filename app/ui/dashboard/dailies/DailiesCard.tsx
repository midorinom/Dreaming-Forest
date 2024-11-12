"use client";
import { useState, useEffect, ChangeEvent } from "react";
import type { DailiesCardProps } from "@/app/lib/definitions/dashboard-definitions";
import type { Daily } from "@/app/lib/definitions/general-definitions";
import { getDateTimes } from "@/app/lib/functions/utility-functions";
import dayjs from "dayjs";

export default function DailiesCard({
  dailyProp,
  dailies,
  setDailies,
  region,
}: DailiesCardProps) {
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    if (dailyProp.done) {
      let dateTimes = getDateTimes(region);
      if (!dateTimes) {
        return;
      }

      let endOfDay = dateTimes.endOfDay;

      // Check whether at least 1 day has passed
      if (endOfDay.diff(dayjs(dailyProp.done), "second") < 86400) {
        setDone(true);
      } else {
        setDone(false);
        const newDailies: Daily[] = [...dailies];
        newDailies[dailyProp.position].done = null;
        setDailies(newDailies);
      }
    }
  }, []);

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    if (done) {
      setDone(false);
      const newDailies: Daily[] = [...dailies];
      newDailies[dailyProp.position].done = null;
      setDailies(newDailies);
    } else {
      setDone(true);
      const newDailies: Daily[] = [...dailies];
      newDailies[dailyProp.position].done = dayjs().toDate();
      setDailies(newDailies);
    }
  }

  return (
    <div className="flex w-full items-center">
      <div className="form-control">
        <label className="label flex cursor-pointer gap-3">
          <input
            type="checkbox"
            className={`checkbox-accent checkbox checkbox-lg border-info ${done ? "hover:border-accent" : "hover:border-neutral"}`}
            checked={done}
            onChange={handleCheckboxChange}
          />
          <span className="label-text text-lg">{dailyProp.description}</span>
        </label>
      </div>
    </div>
  );
}
