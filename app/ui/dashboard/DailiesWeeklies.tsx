import { useState, useEffect } from "react";
import type { DailiesWeekliesProps } from "@/app/lib/definitions/dashboard-definitions";
import { Daily, Weekly } from "@/app/lib/definitions/general-definitions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export default function DailiesWeeklies({
  region,
  activeCharacter,
}: DailiesWeekliesProps) {
  const [dailies, setDailies] = useState<Daily[]>([]);
  const [weeklies, setWeeklies] = useState<Weekly[]>([]);
  const [dailiesTimer, setDailiesTimer] = useState<string>("");

  useEffect(() => {
    setDailies(activeCharacter.dailies);
    setWeeklies(activeCharacter.weeklies);

    // Set Dailies Timer
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
      <div
        className={`w-[36vw] collapse ${
          dailies.length === 0 && "collapse-open"
        } bg-primary`}
      >
        {dailies.length > 0 && (
          <input type="radio" name="accordion" defaultChecked />
        )}
        <div className="pt-3 text-4xl font-medium collapse-title text-info underline-dreamy-neutral underline-offset-8">
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
      <div
        className={`w-[36vw] collapse ${
          weeklies.length === 0 && "collapse-open"
        } bg-secondary`}
      >
        {weeklies.length > 0 && <input type="radio" name="accordion" />}
        <div className="pt-3 text-4xl font-medium collapse-title text-info underline-dreamy-neutral underline-offset-8">
          Weeklies
        </div>
        {weeklies.length > 0 && (
          <div className="collapse-content max-h-[41vh]"></div>
        )}
      </div>
    </div>
  );
}
