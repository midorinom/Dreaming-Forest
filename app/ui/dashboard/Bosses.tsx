"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { BossesProps } from "@/app/lib/definitions/dashboard-definitions";
import type { Boss, User } from "@/app/lib/definitions/general-definitions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isoWeek from "dayjs/plugin/isoWeek";
import BossesEdit from "./BossesEdit";
import BossesCard from "./BossesCard";

export default function Bosses({
  region,
  activeCharacter,
  bossesInfo,
}: BossesProps) {
  const isMounted = useRef(false);
  const [bosses, setBosses] = useState<Boss[]>(activeCharacter.bosses);
  const [bossesTimer, setBossesTimer] = useState<string>("");
  const [headingHovered, setHeadingHovered] = useState<boolean>(false);
  const [editBossesClicked, setEditBossesClicked] = useState<boolean>(false);

  console.log(bosses);

  useEffect(() => {
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

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    }

    const localUser = localStorage.getItem("user");

    if (localUser) {
      const newUser: User = JSON.parse(localUser);
      newUser.characters[activeCharacter.position].bosses = bosses;
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  }, [bosses]);

  return (
    <div className="mt-2 flex w-full flex-col items-center">
      {editBossesClicked ? (
        <BossesEdit
          bossesInfo={bossesInfo}
          bosses={bosses}
          setBosses={setBosses}
          setEditBossesClicked={setEditBossesClicked}
        />
      ) : (
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
            <div className="collapse-content max-h-[50vh] pb-0 pt-0">
              {bosses.map((boss) => (
                <BossesCard
                  key={boss.bossesPosition}
                  boss={boss}
                  bosses={bosses}
                  setBosses={setBosses}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
