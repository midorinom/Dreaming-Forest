"use client";
import { useState, useEffect, ChangeEvent } from "react";
import type { WeekliesCardProps } from "@/app/lib/definitions/dashboard-definitions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export default function WeekliesCard({
  weeklyProp,
  weeklies,
  setWeeklies,
  region,
}: WeekliesCardProps) {
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    if (weeklyProp.done) {
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

      if (endOfDay.diff(dayjs(weeklyProp.done), "minute") < 1440) {
        setDone(true);
      } else {
        setDone(false);
        const newWeeklies = [...weeklies];
        newWeeklies[weeklyProp.position].done = null;
        setWeeklies(newWeeklies);
      }
    }
  }, []);

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    if (done) {
      setDone(false);
      const newWeeklies = [...weeklies];
      newWeeklies[weeklyProp.position].done = null;
      setWeeklies(newWeeklies);
    } else {
      setDone(true);
      const newWeeklies = [...weeklies];
      newWeeklies[weeklyProp.position].done = dayjs().toDate();
      setWeeklies(newWeeklies);
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
          <div className="flex">
            <span className="label-text text-lg">{weeklyProp.description}</span>
            <span>{weeklyProp.resetDate.toString()}</span>
          </div>
        </label>
      </div>
    </div>
  );
}
