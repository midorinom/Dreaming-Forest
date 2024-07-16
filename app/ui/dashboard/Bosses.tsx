"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { BossesProps } from "@/app/lib/definitions/dashboard-definitions";
import { Boss } from "@/app/lib/definitions/general-definitions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isoWeek from "dayjs/plugin/isoWeek";
import BossesEdit from "./BossesEdit";

export default function Bosses({ region, activeCharacter }: BossesProps) {
  const [bosses, setBosses] = useState<Boss[]>([]);
  const [bossesTimer, setBossesTimer] = useState<string>("");
  const [headingHovered, setHeadingHovered] = useState<boolean>(false);
  const [editBossesClicked, setEditBossesClicked] = useState<boolean>(false);

  useEffect(() => {
    // Set Bosses
    setBosses(activeCharacter.bosses);

    // Set Timer
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
    <>
      {editBossesClicked ? (
        <BossesEdit setEditBossesClicked={setEditBossesClicked} />
      ) : (
        <div className="mt-2 flex w-full flex-col items-center">
          <div
            className={`${bosses.length > 0 && "pb3"} collapse collapse-open w-4/5 gap-2 bg-base-100`}
          >
            <div
              className={`${
                bosses.length === 0 && "mb-1"
              } collapse-title pb-0 pt-3`}
              onMouseEnter={() => setHeadingHovered(true)}
              onMouseLeave={() => setHeadingHovered(false)}
            >
              <div className="flex gap-2">
                <span className="text-4xl font-medium text-info underline-offset-8 underline-dreamy-neutral">
                  Bosses
                </span>
                {headingHovered && (
                  <Image
                    src="/general/ui_icons/edit_icon.png"
                    height={0}
                    width={0}
                    alt="Edit Button"
                    sizes="100vw"
                    className="h-[2.5rem] w-[auto] hover:cursor-pointer"
                    onClick={() => setEditBossesClicked(true)}
                  />
                )}
              </div>
            </div>
            {bossesTimer && bosses.length > 0 && (
              <div className="absolute right-2 top-1 text-2xl text-info">
                {bossesTimer}
              </div>
            )}
            {bosses.length > 0 && (
              <div className="collapse-content max-h-[50vh] pb-0 pt-0"></div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
