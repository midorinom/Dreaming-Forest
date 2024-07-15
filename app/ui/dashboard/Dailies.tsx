import { useState, useEffect } from "react";
import Image from "next/image";
import type { DailiesProps } from "@/app/lib/definitions/dashboard-definitions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export default function Dailies({
  region,
  dailies,
  weeklies,
  setEditDailiesClicked,
}: DailiesProps) {
  const [dailiesTimer, setDailiesTimer] = useState<string>("");
  const [headingHovered, setHeadingHovered] = useState<boolean>(false);

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
      className={`collapse w-[36vw] ${
        (weeklies.length === 0 || dailies.length === 0) && "collapse-open"
      } bg-primary`}
    >
      {dailies.length > 0 && (
        <input type="radio" name="accordion" defaultChecked />
      )}
      <div
        className={`${
          dailies.length === 0 && "mb-1"
        } collapse-title pt-3 text-4xl font-medium text-info underline-offset-8 underline-dreamy-neutral`}
        onMouseEnter={() => setHeadingHovered(true)}
        onMouseLeave={() => setHeadingHovered(false)}
      >
        <div className="flex gap-2">
          <span>Dailies</span>
          {headingHovered && (
            <Image
              src="/general/ui_icons/edit_icon.png"
              height={0}
              width={0}
              alt="Progression Button"
              sizes="100vw"
              className="h-[2.5rem] w-[auto] hover:cursor-pointer"
              onClick={() => setEditDailiesClicked(true)}
            />
          )}
        </div>
      </div>
      {dailiesTimer && dailies.length > 0 && (
        <div className="absolute right-2 top-1 text-2xl text-info">
          {dailiesTimer}
        </div>
      )}
      {dailies.length > 0 && (
        <div className="collapse-content max-h-[41vh]"></div>
      )}
    </div>
  );
}
