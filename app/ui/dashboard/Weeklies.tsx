"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { WeekliesProps } from "@/app/lib/definitions/dashboard-definitions";
import type { Weekly } from "@/app/lib/definitions/general-definitions";
import WeekliesCard from "./WeekliesCard";
import dayjs from "dayjs";

export default function Weeklies({
  region,
  weeklies,
  setWeeklies,
  setEditWeekliesClicked,
  selectedTab,
  setSelectedTab,
}: WeekliesProps) {
  const [headingHovered, setHeadingHovered] = useState<boolean>(false);
  const [sortedWeeklies, setSortedWeeklies] = useState<Weekly[]>([]);

  function handleHeadingClick() {
    if (selectedTab === "Dailies" && weeklies.length > 0) {
      setSelectedTab("Weeklies");
    }
  }

  useEffect(() => {
    const newWeeklies: Weekly[] = [...weeklies].sort((a, b) => {
      return dayjs(a.resetDate).unix() - dayjs(b.resetDate).unix();
    });

    setSortedWeeklies(newWeeklies);
  }, []);

  return (
    <div
      className={`collapse w-[36vw] ${
        weeklies.length > 0 && selectedTab === "Weeklies" && "pb-3"
      } ${(weeklies.length === 0 || selectedTab === "Weeklies") && "collapse-open"} gap-2 bg-secondary`}
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
