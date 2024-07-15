"use client";
import { useState, useEffect } from "react";
import type { BossesProps } from "@/app/lib/definitions/dashboard-definitions";
import { Boss } from "@/app/lib/definitions/general-definitions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isoWeek from "dayjs/plugin/isoWeek";

export default function Bosses({ region, activeCharacter }: BossesProps) {
  const [bosses, setBosses] = useState<Boss[]>([]);
  const [bossesTimer, setBossesTimer] = useState<string>("");

  useEffect(() => {
    // Set Dailies and Weeklies
    setBosses(activeCharacter.bosses);

    // Set Dailies Timer
    dayjs.extend(utc);
    dayjs.extend(isoWeek);
    let now = undefined;
    let endOfDay = undefined;
    let nextThursday = undefined;

    switch (region) {
      case "MSEA":
        now = dayjs().utcOffset(8);
        endOfDay = dayjs().utcOffset(8).endOf("day");
        nextThursday = now.isoWeekday(4);
        if (now.isoWeekday() >= 4) {
          nextThursday = nextThursday.add(1, "week");
        }
        nextThursday = nextThursday.startOf("day");

        setBossesTimer(
          `${nextThursday.diff(now, "day")}d${endOfDay.diff(now, "hour")}h`,
        );
        break;

      case "GMS":
        now = dayjs().utc();
        endOfDay = dayjs().utc().endOf("day");
        nextThursday = now.isoWeekday(4);
        if (now.isoWeekday() >= 4) {
          nextThursday = nextThursday.add(1, "week");
        }
        nextThursday = nextThursday.startOf("day");

        setBossesTimer(
          `${nextThursday.diff(now, "day")}d${endOfDay.diff(now, "hour")}h`,
        );
        break;

      default:
        console.error("No region");
        return;
    }
  }, []);

  return (
    <div className="w-full">
      <div className="mt-2 flex w-full flex-col items-center">
        <div className="collapse collapse-open w-4/5 bg-base-100">
          <div
            className={`${
              bosses.length === 0 && "mb-1"
            } collapse-title pt-3 text-4xl font-medium text-info underline-offset-8 underline-dreamy-neutral`}
          >
            Bosses
          </div>
          {bossesTimer && bosses.length > 0 && (
            <div className="absolute right-2 top-1 text-2xl text-info">
              {bossesTimer}
            </div>
          )}
          {bosses.length > 0 && (
            <div className="collapse-content max-h-[50vh]"></div>
          )}
        </div>
      </div>
    </div>
  );
}
