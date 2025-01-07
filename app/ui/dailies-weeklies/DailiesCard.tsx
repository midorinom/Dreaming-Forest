"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { DailiesCardProps } from "@/app/lib/definitions/dailies-weeklies-definitions";
import { Character, User } from "@/app/lib/definitions/general-definitions";

export default function DailiesCard({
  character,
  dailies,
  filter,
  dailiesCharacters,
  setDailiesCharacters,
  region,
}: DailiesCardProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const [totalDailiesDone, setTotalDailiesDone] = useState<number>(0);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (dailies[0].done) {
      setChecked(true);
    } else {
      setChecked(false);
    }

    let total: number = 0;

    for (const daily of dailies) {
      if (daily.done) {
        total += 1;
      }
    }

    setTotalDailiesDone(total);
  }, [dailies]);

  function handleRedirect() {
    const params = new URLSearchParams(searchParams);
    params.set("id", character.characterId.toString());

    router.replace(`/?${params.toString()}`);
  }

  function handleCheckboxChange() {
    if (!filter) {
      return;
    }

    const newDailiesCharacters: Character[] = JSON.parse(
      JSON.stringify(dailiesCharacters),
    );
    const localUser = localStorage.getItem("user");

    if (checked) {
      setChecked(false);

      for (const newDailiesCharacter of newDailiesCharacters) {
        if (newDailiesCharacter.characterId === character.characterId) {
          newDailiesCharacter.dailies[dailies[0].position].done = null;
        }
      }

      if (localUser) {
        const newUser: User = JSON.parse(localUser);
        newUser.characters[character.position].dailies[
          dailies[0].position
        ].done = null;
        localStorage.setItem("user", JSON.stringify(newUser));
      }
    } else {
      setChecked(true);
      const doneDate = new Date();

      for (const newDailiesCharacter of newDailiesCharacters) {
        if (newDailiesCharacter.characterId === character.characterId) {
          newDailiesCharacter.dailies[dailies[0].position].done = doneDate;
        }
      }

      if (localUser) {
        const newUser: User = JSON.parse(localUser);
        newUser.characters[character.position].dailies[
          dailies[0].position
        ].done = doneDate;
        localStorage.setItem("user", JSON.stringify(newUser));
      }
    }

    setDailiesCharacters(newDailiesCharacters);
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
        {filter || totalDailiesDone === dailies.length ? (
          <input
            id={`${dailies[0].dailyId}`}
            type="checkbox"
            className={`checkbox-accent checkbox checkbox-lg w-1/3 cursor-default border-info ${filter && "hover:cursor-pointer"} ${checked ? "hover:border-accent" : "hover:border-info"}`}
            checked={checked}
            onChange={handleCheckboxChange}
          />
        ) : (
          <div className="w-fit-content label-text text-lg">{`${totalDailiesDone} / ${dailies.length}`}</div>
        )}
      </div>
    </div>
  );
}
