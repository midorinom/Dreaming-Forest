"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { WeekliesCardProps } from "@/app/lib/definitions/dailies-weeklies-definitions";
import { Character, User } from "@/app/lib/definitions/general-definitions";

export default function WeekliesCard({
  character,
  weeklies,
  filter,
  weekliesCharacters,
  setWeekliesCharacters,
}: WeekliesCardProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const [totalWeekliesDone, setTotalWeekliesDone] = useState<number>(0);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (weeklies[0].done) {
      setChecked(true);
    } else {
      setChecked(false);
    }

    let total: number = 0;

    for (const weekly of weeklies) {
      if (weekly.done) {
        total += 1;
      }
    }

    setTotalWeekliesDone(total);
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

    const newWeekliesCharacters: Character[] = JSON.parse(
      JSON.stringify(weekliesCharacters),
    );
    const localUser = localStorage.getItem("user");

    if (checked) {
      setChecked(false);

      for (const newWeekliesCharacter of newWeekliesCharacters) {
        if (newWeekliesCharacter.characterId === character.characterId) {
          newWeekliesCharacter.weeklies[weeklies[0].position].done = null;
        }
      }

      if (localUser) {
        const newUser: User = JSON.parse(localUser);
        newUser.characters[character.position].weeklies[
          weeklies[0].position
        ].done = null;
        localStorage.setItem("user", JSON.stringify(newUser));
      }
    } else {
      setChecked(true);
      const doneDate = new Date();

      for (const newWeekliesCharacter of newWeekliesCharacters) {
        if (newWeekliesCharacter.characterId === character.characterId) {
          newWeekliesCharacter.weeklies[weeklies[0].position].done = doneDate;
        }
      }

      if (localUser) {
        const newUser: User = JSON.parse(localUser);
        newUser.characters[character.position].weeklies[
          weeklies[0].position
        ].done = doneDate;
        localStorage.setItem("user", JSON.stringify(newUser));
      }
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
