"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { UUID } from "crypto";
import type { WeekliesEditProps } from "@/app/lib/definitions/dashboard-definitions";
import type { Weekly } from "@/app/lib/definitions/general-definitions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import WeekliesEditCard from "./WeekliesEditCard";

export default function WeekliesEdit({
  region,
  weeklies,
  setWeeklies,
  setEditWeekliesClicked,
}: WeekliesEditProps) {
  dayjs.extend(utc);
  const [resetDates, setResetDates] = useState<Date[]>([]);

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

  useEffect(() => {
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
      {weeklies.length > 0 && resetDates.length > 0 && (
        <div className="collapse-content flex max-h-[41vh] flex-col gap-2 overflow-scroll pb-0 pt-0 scrollbar-hide">
          {weeklies.map((weekly) => (
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
