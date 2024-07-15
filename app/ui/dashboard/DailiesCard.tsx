"use client";
import { useState, useEffect, ChangeEvent } from "react";
import type { DailiesCardProps } from "@/app/lib/definitions/dashboard-definitions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export default function DailiesCard({
  dailyProp,
  dailies,
  setDailies,
}: DailiesCardProps) {
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    dayjs.extend(utc);
    if (dailyProp.done) {
      setDone(true);
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
            className="checkbox-accent checkbox checkbox-lg border-info"
            checked={done}
            onChange={handleCheckboxChange}
          />
          <span className="label-text text-lg">{dailyProp.description}</span>
        </label>
      </div>
    </div>
  );
}
