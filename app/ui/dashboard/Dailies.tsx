import { useState, useEffect } from "react";
import type { DailiesProps } from "@/app/lib/definitions/dashboard-definitions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export default function Dailies({ region, dailies, weeklies }: DailiesProps) {
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
    <div
      className={`w-[36vw] collapse ${
        (weeklies.length === 0 || dailies.length === 0) && "collapse-open"
      } bg-primary`}
    >
      {dailies.length > 0 && (
        <input type="radio" name="accordion" defaultChecked />
      )}
      <div
        className={`${
          dailies.length === 0 && "mb-1"
        } text-4xl font-medium collapse-title text-info underline-dreamy-neutral pt-3 underline-offset-8`}
      >
        Dailies
      </div>
      {dailiesTimer && dailies.length > 0 && (
        <div className="absolute text-2xl top-1 right-2 text-info">
          {dailiesTimer}
        </div>
      )}
      {dailies.length > 0 && (
        <div className="collapse-content max-h-[41vh]"></div>
      )}
    </div>
  );
}
