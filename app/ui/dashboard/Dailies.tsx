"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { DailiesProps } from "@/app/lib/definitions/dashboard-definitions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import DailiesCard from "./DailiesCard";

export default function Dailies({
  region,
  dailies,
  setDailies,
  setEditDailiesClicked,
  selectedTab,
  setSelectedTab,
}: DailiesProps) {
  dayjs.extend(utc);
  const [dailiesTimer, setDailiesTimer] = useState<string>("");
  const [headingHovered, setHeadingHovered] = useState<boolean>(false);

  function handleHeadingClick() {
    if (selectedTab === "Weeklies" && dailies.length > 0) {
      setSelectedTab("Dailies");
    }
  }

  useEffect(() => {
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
        dailies.length > 0 && selectedTab === "Dailies" && "pb-3"
      } ${(dailies.length === 0 || selectedTab === "Dailies") && "collapse-open"} gap-2 bg-primary`}
    >
      <div
        className={`${(dailies.length === 0 || selectedTab !== "Dailies") && "mb-1"} collapse-title pb-0 pt-3`}
        onMouseEnter={() => setHeadingHovered(true)}
        onMouseLeave={() => setHeadingHovered(false)}
        onClick={handleHeadingClick}
      >
        <div className="flex gap-2">
          <span className="text-4xl font-medium text-info underline-offset-8 underline-dreamy-neutral">
            Dailies
          </span>
          {headingHovered &&
            (selectedTab === "Dailies" || dailies.length === 0) && (
              <Image
                src="/general/ui_icons/edit_icon.png"
                height={0}
                width={0}
                alt="Edit Button"
                sizes="100vw"
                className="h-[2.5rem] w-[auto] hover:cursor-pointer"
                onClick={() => setEditDailiesClicked(true)}
              />
            )}
        </div>
      </div>
      {dailiesTimer && dailies.length > 0 && (
        <div className="absolute right-4 top-2 text-2xl text-info">
          {dailiesTimer}
        </div>
      )}
      {dailies.length > 0 && selectedTab === "Dailies" && (
        <div className="collapse-content max-h-[41vh] flex-col gap-1 overflow-scroll pb-0 pt-0 scrollbar-hide">
          {dailies.map((daily) => (
            <DailiesCard
              key={daily.dailyId}
              dailyProp={daily}
              dailies={dailies}
              setDailies={setDailies}
              region={region}
            />
          ))}
        </div>
      )}
    </div>
  );
}
