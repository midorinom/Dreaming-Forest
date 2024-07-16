"use client";
import { useState, useEffect, ChangeEvent } from "react";
import type { DailiesCardProps } from "@/app/lib/definitions/dashboard-definitions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export default function DailiesCard({
  dailyProp,
  dailies,
  setDailies,
  region,
}: DailiesCardProps) {
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    if (dailyProp.done) {
      dayjs.extend(utc);
      let endOfDay = undefined;

      switch (region) {
        case "MSEA":
          endOfDay = dayjs().utcOffset(8).endOf("day");
          break;

        case "GMS":
          endOfDay = dayjs().utc().endOf("day");
          break;

        default:
          console.error("No region");
          return;
      }

      if (endOfDay.diff(dayjs(dailyProp.done), "minute") < 1440) {
        setDone(true);
      } else {
        setDone(false);
        const newDailies = [...dailies];
        newDailies[dailyProp.position].done = null;
        setDailies(newDailies);
      }
    }
  }, []);

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    if (done) {
      setDone(false);
      const newDailies = [...dailies];
      newDailies[dailyProp.position].done = null;
      setDailies(newDailies);
    } else {
      setDone(true);
      const newDailies = [...dailies];
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
