"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import type {
  WeekliesProps,
  WeeklyMapping,
} from "@/app/lib/definitions/dashboard-definitions";
import type { Weekly } from "@/app/lib/definitions/general-definitions";
import WeekliesCard from "./WeekliesCard";
import dayjs from "dayjs";
import utc from "dayjs/plugin/isoWeek";
import isoWeek from "dayjs/plugin/isoWeek";

export default function Weeklies({
  region,
  weeklies,
  setWeeklies,
  setEditWeekliesClicked,
  selectedTab,
  setSelectedTab,
}: WeekliesProps) {
  dayjs.extend(utc);
  dayjs.extend(isoWeek);
  const [headingHovered, setHeadingHovered] = useState<boolean>(false);
  const [sortedWeeklies, setSortedWeeklies] = useState<Weekly[]>([]);

  useEffect(() => {
    // Create New Mapping
    const currentDayOfWeek = getIsoWeekday(new Date());
    const nextDayOfWeek = currentDayOfWeek + 1;
    const newMapping: WeeklyMapping = {};

    for (let i = 0; i < 7; i++) {
      let key = nextDayOfWeek + i;

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
  }, [weeklies]);

  function handleHeadingClick() {
    if (selectedTab === "Dailies" && weeklies.length > 0) {
      setSelectedTab("Weeklies");
    }
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

  return (
    <div
      className={`collapse w-[36vw] ${
        weeklies.length > 0 && selectedTab === "Weeklies" && "pb-3"
      } ${(weeklies.length === 0 || selectedTab === "Weeklies") && "collapse-open"} max-h-[50vh] gap-2 overflow-scroll bg-secondary scrollbar-hide`}
    >
      <div
        className={`${(weeklies.length === 0 || selectedTab !== "Weeklies") && "mb-1"} collapse-title pb-0 pt-3`}
        onMouseEnter={() => setHeadingHovered(true)}
        onMouseLeave={() => setHeadingHovered(false)}
        onClick={handleHeadingClick}
      >
        <div className="flex gap-2">
          <span className="text-4xl font-medium text-info underline-offset-8 underline-dreamy-neutral">
            Weeklies
          </span>
          {headingHovered &&
            (selectedTab === "Weeklies" || weeklies.length === 0) && (
              <Image
                src="/general/ui_icons/edit_icon.png"
                height={0}
                width={0}
                alt="Edit Button"
                sizes="100vw"
                className="h-[2.5rem] w-[auto] hover:cursor-pointer"
                onClick={() => setEditWeekliesClicked(true)}
              />
            )}
        </div>
      </div>
      {selectedTab === "Weeklies" &&
        weeklies.length > 0 &&
        sortedWeeklies.length > 0 && (
          <div className="collapse-content max-h-[41vh] flex-col gap-1 overflow-scroll pb-0 pt-0 scrollbar-hide">
            {sortedWeeklies.map((weekly) => (
              <WeekliesCard
                key={weekly.weeklyId}
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
