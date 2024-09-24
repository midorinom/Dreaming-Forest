"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { BossesProps } from "@/app/lib/definitions/dashboard-definitions";
import type {
  Boss,
  Character,
  User,
} from "@/app/lib/definitions/general-definitions";
import { getDateTimes } from "@/app/lib/utility-functions/utility-functions";
import BossesEdit from "./BossesEdit";
import BossesCard from "./BossesCard";

export default function Bosses({
  region,
  activeCharacter,
  bossesInfo,
}: BossesProps) {
  const [currentCharacterId, setCurrentCharacterId] = useState<string>("");
  const [bosses, setBosses] = useState<Boss[]>([]);
  const [bossesTimer, setBossesTimer] = useState<string>("");
  const [headingHovered, setHeadingHovered] = useState<boolean>(false);
  const [editBossesClicked, setEditBossesClicked] = useState<boolean>(false);
  const [resetDate, setResetDate] = useState<Date | null>(null);

  useEffect(() => {
    setEditBossesClicked(false);
    setHeadingHovered(false);

    const localUser = localStorage.getItem("user");
    if (localUser) {
      // Sort Bosses
      const parsedCharacter: Character =
        JSON.parse(localUser).characters[activeCharacter.position];

      if (parsedCharacter.bosses.length > 1) {
        const sortedBosses = parsedCharacter.bosses.sort((a, b) => {
          if (a.done !== b.done) {
            return a.done ? 1 : -1;
          }

          return a.bossesPosition - b.bossesPosition;
        });

        setBosses(sortedBosses);
      } else {
        setBosses(parsedCharacter.bosses);
      }
    }

    // Set Timer
    let dateTimes = getDateTimes(region);
    if (!dateTimes) {
      return;
    }

    let now = dateTimes.now;
    let endOfDay = dateTimes.endOfDay;
    let nextThursday = dateTimes.nextThursday;

    setBossesTimer(
      `${nextThursday.diff(now, "day")}d ${endOfDay.diff(now, "hour")}h`,
    );
    setResetDate(nextThursday.toDate());
  }, [activeCharacter]);

  useEffect(() => {
    if (currentCharacterId !== activeCharacter.characterId) {
      setCurrentCharacterId(activeCharacter.characterId);
      return;
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
            <div className="absolute right-4 top-2 text-2xl text-info">
              {bossesTimer}
            </div>
          )}
          {bosses.length > 0 && resetDate && (
            <div className="collapse-content grid max-h-[50vh] auto-rows-fr grid-cols-6 gap-7 px-11 pb-5 pt-2">
              {bosses.map((boss) => (
                <BossesCard
                  key={boss.bossesPosition}
                  boss={boss}
                  bosses={bosses}
                  setBosses={setBosses}
                  resetDate={resetDate}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
