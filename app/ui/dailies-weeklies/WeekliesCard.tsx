"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { WeekliesCardProps } from "@/app/lib/definitions/dailies-weeklies-definitions";
import { Character, User } from "@/app/lib/definitions/general-definitions";
import { getDateTimes } from "@/app/lib/functions/utility-functions";
import dayjs from "dayjs";

export default function WeekliesCard({
  character,
  weeklies,
  filter,
  weekliesCharacters,
  setWeekliesCharacters,
  region,
}: WeekliesCardProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const [totalWeekliesDone, setTotalWeekliesDone] = useState<number>(0);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    let total: number = 0;

    for (const weekly of weeklies) {
      if (weekly.done) {
        const dateTimes = getDateTimes(region, weekly.resetDate);
        if (!dateTimes) {
          return;
        }
        const nextResetDay = dateTimes.nextResetDay;

        // Check whether 1 week has passed
        if (dayjs(nextResetDay).diff(dayjs(weekly.done), "week") < 1) {
          total += 1;
        } else {
          toggleDone(weekly.position, false);
        }
      }
    }
    setTotalWeekliesDone(total);

    if (weeklies[0].done) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [weeklies]);

  function handleRedirect() {
    const params = new URLSearchParams(searchParams);
    params.set("id", character.characterId.toString());

    router.replace(`/?${params.toString()}`);
  }

  function handleCheckboxChange() {
    if (!filter) {
      return;
    }

    if (checked) {
      setChecked(false);
      toggleDone(weeklies[0].position, false);
    } else {
      setChecked(true);
      toggleDone(weeklies[0].position, true);
    }
  }

  function toggleDone(weeklyPosition: number, setToDone: boolean) {
    const newWeekliesCharacters: Character[] = JSON.parse(
      JSON.stringify(weekliesCharacters),
    );
    const localUser = localStorage.getItem("user");
    const doneDate = new Date();

    for (const newWeekliesCharacter of newWeekliesCharacters) {
      if (newWeekliesCharacter.characterId === character.characterId) {
        if (setToDone) {
          newWeekliesCharacter.weeklies[weeklyPosition].done = doneDate;
        } else {
          newWeekliesCharacter.weeklies[weeklyPosition].done = null;
        }
      }
    }

    if (localUser) {
      const newUser: User = JSON.parse(localUser);
      if (setToDone) {
        newUser.characters[character.position].weeklies[weeklyPosition].done =
          doneDate;
      } else {
        newUser.characters[character.position].weeklies[weeklyPosition].done =
          null;
      }
      localStorage.setItem("user", JSON.stringify(newUser));
    }

    setWeekliesCharacters(newWeekliesCharacters);
  }

  return (
    <div className="flex h-full w-4/5 items-center justify-center">
      <div
        style={{
          position: "relative",
        }}
        className="flex h-full w-full items-center justify-center"
      >
        <Image
          src={character.image ? character.image : "/general/naked_char.png"}
          height={0}
          width={0}
          alt="Character Image"
          sizes="100vw"
          className="absolute h-full w-auto hover:cursor-pointer"
          onClick={handleRedirect}
        />
      </div>
      <div className="mt-2 w-1/3">
        {filter || totalWeekliesDone === weeklies.length ? (
          <input
            id={`${weeklies[0].weeklyId}`}
            type="checkbox"
            className={`checkbox-accent checkbox checkbox-lg w-1/3 cursor-default border-info ${filter && "hover:cursor-pointer"} ${checked ? "hover:border-accent" : "hover:border-info"}`}
            checked={checked}
            onChange={handleCheckboxChange}
          />
        ) : (
          <div className="w-fit-content label-text text-lg">{`${totalWeekliesDone} / ${weeklies.length}`}</div>
        )}
      </div>
    </div>
  );
}
