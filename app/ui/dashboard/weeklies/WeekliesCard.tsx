"use client";
import { useState, useEffect, ChangeEvent } from "react";
import type { WeekliesCardProps } from "@/app/lib/definitions/dashboard-definitions";
import type { Weekly } from "@/app/lib/definitions/general-definitions";
import { getDateTimes } from "@/app/lib/functions/utility-functions";
import dayjs from "dayjs";

export default function WeekliesCard({
  weeklyProp,
  weeklies,
  setWeeklies,
  region,
}: WeekliesCardProps) {
  const [done, setDone] = useState<boolean>(false);
  const [timer, setTimer] = useState<string>("");

  useEffect(() => {
    let dateTimes = getDateTimes(region, weeklyProp.resetDate);
    if (!dateTimes || !dateTimes.nextResetDay) {
      return;
    }

    let now = dateTimes.now;
    let endOfDay = dateTimes.endOfDay;
    let nextResetDay = dateTimes.nextResetDay;

    const timerString = `${nextResetDay.diff(now, "day")}d ${endOfDay.diff(now, "hour")}h`;
    setTimer(timerString);

    if (weeklyProp.done) {
      if (dayjs(nextResetDay).diff(dayjs(weeklyProp.done), "week") < 1) {
        setDone(true);
      } else {
        setDone(false);
        const newWeeklies: Weekly[] = [...weeklies];
        newWeeklies[weeklyProp.position].done = null;
        setWeeklies(newWeeklies);
      }
    }
  }, []);

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    if (done) {
      setDone(false);
      const newWeeklies: Weekly[] = [...weeklies];
      newWeeklies[weeklyProp.position].done = null;
      setWeeklies(newWeeklies);
    } else {
      setDone(true);
      const newWeeklies: Weekly[] = [...weeklies];
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
          <div className="flex gap-2">
            <span className="label-text text-lg">{weeklyProp.description}</span>
            {timer && (
              <span className="text-lg font-medium text-info">{timer}</span>
            )}
          </div>
        </label>
      </div>
    </div>
  );
}
