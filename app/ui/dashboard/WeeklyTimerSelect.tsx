"use client";
import { useState, useEffect, ChangeEvent } from "react";
import type { WeeklyTimerSelectProps } from "@/app/lib/definitions/dashboard-definitions";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

export default function WeeklyTimerSelect({
  weekly,
  setWeekly,
  resetDates,
}: WeeklyTimerSelectProps) {
  const [timerInput, setTimerInput] = useState<string>("0d");

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    const numberOfDays = parseInt(e.target.value, 10);
    const newWeekly = { ...weekly, resetDate: resetDates[numberOfDays] };

    setWeekly(newWeekly);
    setTimerInput(e.target.value);
  }

  useEffect(() => {
    dayjs.extend(isoWeek);

    if (weekly) {
      for (const resetDate of resetDates) {
        if (
          dayjs(resetDate).isoWeekday() === dayjs(weekly.resetDate).isoWeekday()
        ) {
          setTimerInput(`${resetDates.indexOf(resetDate)}d`);
        }
      }
    }
  }, []);

  return (
    <select
      className="select select-bordered w-1/6 bg-neutral text-lg focus:outline-none"
      onChange={handleSelectChange}
      value={timerInput}
    >
      <option>0d</option>
      <option>1d</option>
      <option>2d</option>
      <option>3d</option>
      <option>4d</option>
      <option>5d</option>
      <option>6d</option>
    </select>
  );
}
