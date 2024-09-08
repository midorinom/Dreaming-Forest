"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { UUID } from "crypto";
import type {
  WeekliesEditProps,
  WeeklyMapping,
} from "@/app/lib/definitions/dashboard-definitions";
import type { Weekly } from "@/app/lib/definitions/general-definitions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isoWeek from "dayjs/plugin/isoWeek";
import WeekliesEditCard from "./WeekliesEditCard";

export default function WeekliesEdit({
  region,
  weeklies,
  setWeeklies,
  setEditWeekliesClicked,
}: WeekliesEditProps) {
  dayjs.extend(utc);
  dayjs.extend(isoWeek);
  const [resetDates, setResetDates] = useState<Date[]>([]);
  const [sortedWeeklies, setSortedWeeklies] = useState<Weekly[]>([]);

  function addWeekly() {
    const newWeekly: Weekly = {
      weeklyId: uuidv4() as UUID,
      description: "",
      done: null,
      position: weeklies.length,
      resetDate: resetDates[6],
    };

    setWeeklies([...weeklies, newWeekly]);
  }

  function getIsoWeekday(date: Date): number {
    switch (region) {
      case "MSEA":
        return dayjs(date).utcOffset(8).isoWeekday();

      case "GMS":
        return dayjs(date).utc().isoWeekday();

      default:
        console.error("No region");
        return -1;
    }
  }

  useEffect(() => {
    // Set Reset Dates
    let startOfDay = undefined;

    switch (region) {
      case "MSEA":
        startOfDay = dayjs().utcOffset(8).startOf("day");
        break;

      case "GMS":
        startOfDay = dayjs().utc().startOf("day");
        break;

      default:
        console.error("No region");
        return;
    }

    const newResetDates = [];
    for (let i = 1; i < 8; i++) {
      const nextDate = startOfDay.add(i, "day");
      newResetDates.push(nextDate.toDate());
    }

    setResetDates(newResetDates);

    // Create New Mapping
    const currentDayOfWeek = getIsoWeekday(new Date());
    const newMapping: WeeklyMapping = {};

    for (let i = 0; i < 7; i++) {
      let key = currentDayOfWeek + i;

      if (key > 7) {
        key -= 7;
      }

      newMapping[key] = i;
    }

    // Sort Weeklies
    const newWeeklies: Weekly[] = [...weeklies].sort((a, b) => {
      return (
        newMapping[getIsoWeekday(a.resetDate)] -
        newMapping[getIsoWeekday(b.resetDate)]
      );
    });

    setSortedWeeklies(newWeeklies);
  }, []);

  return (
    <div className="collapse collapse-open flex w-[36vw] flex-col gap-2 bg-secondary pb-3">
      <div className="collapse-title pb-0 pl-2 pr-5 pt-3">
        <div className="flex content-center justify-between">
          <Image
            src="/general/ui_icons/back_icon.png"
            height={0}
            width={0}
            alt="Back Button"
            sizes="100vw"
            className="h-[2.75rem] w-[auto] hover:cursor-pointer"
            onClick={() => setEditWeekliesClicked(false)}
          />
          <span className="text-4xl font-medium text-info underline-offset-8 underline-dreamy-neutral">
            Weeklies
          </span>
          <button
            className="btn btn-neutral text-3xl text-info"
            onClick={addWeekly}
          >
            +
          </button>
        </div>
      </div>
      {weeklies.length > 0 &&
        sortedWeeklies.length > 0 &&
        resetDates.length > 0 && (
          <div className="collapse-content flex max-h-[41vh] flex-col gap-2 overflow-scroll pb-0 pt-0 scrollbar-hide">
            {sortedWeeklies.map((weekly) => (
              <WeekliesEditCard
                key={weekly.weeklyId}
                resetDates={resetDates}
                weeklyProp={weekly}
                weeklies={weeklies}
                setWeeklies={setWeeklies}
                region={region}
              />
            ))}
          </div>
        )}
    </div>
  );
}
