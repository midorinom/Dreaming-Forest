import { useState, useEffect } from "react";
import type { DailiesWeekliesProps } from "@/app/lib/definitions/dashboard-definitions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export default function DailiesWeeklies({
  region,
  activeCharacter,
}: DailiesWeekliesProps) {
  const [dailiesTimer, setDailiesTimer] = useState<string>("");

  useEffect(() => {
    dayjs.extend(utc);
    let now = undefined;
    let endOfDay = undefined;

    switch (region) {
      case "MSEA":
        now = dayjs().utcOffset(8);
        endOfDay = dayjs().utcOffset(8).endOf("day");
        setDailiesTimer(`${endOfDay.diff(now, "hour")}h`);
        break;

      case "GMS":
        now = dayjs().utc();
        endOfDay = dayjs().utc().endOf("day");
        setDailiesTimer(`${endOfDay.diff(now, "hour")}h`);
        break;

      default:
        console.error("No region");
        return;
    }
  }, []);

  return (
    <div className="flex flex-col items-end w-full mt-2">
      <div className="w-[36vw] collapse bg-primary">
        <input type="radio" name="accordion" defaultChecked />
        <div className="pt-3 text-4xl font-medium collapse-title text-info underline-dreamy-neutral underline-offset-8">
          Dailies
        </div>
        {dailiesTimer && (
          <div className="absolute text-2xl top-1 right-2 text-info">
            {dailiesTimer}
          </div>
        )}
        <div className="collapse-content max-h-[41vh]"></div>
      </div>
      <div className="w-[36vw] collapse bg-secondary">
        <input type="radio" name="accordion" />
        <div className="pt-3 text-4xl font-medium collapse-title text-info underline-dreamy-neutral underline-offset-8">
          Weeklies
        </div>
        <div className="collapse-content max-h-[41vh]"></div>
      </div>
    </div>
  );
}
