"use client";
import { useState } from "react";
import { CheckboxCardProps } from "@/app/lib/definitions/bosses-definitions";
import { User } from "@/app/lib/definitions/general-definitions";
import { getDateTimes } from "@/app/lib/functions/utility-functions";

export default function CheckboxCard({
  boss,
  region,
  characterPosition,
  setCharacters,
}: CheckboxCardProps) {
  const [checked, setChecked] = useState<boolean>(
    boss ? (boss.done ? true : false) : false,
  );

  function handleCheckboxChange() {
    const localUser = localStorage.getItem("user");

    if (localUser) {
      const newUser: User = JSON.parse(localUser);
      for (const newBoss of newUser.characters[characterPosition].bosses) {
        if (newBoss.bossesPosition === boss?.bossesPosition) {
          if (checked) {
            newBoss.done = null;
          } else {
            const dateTimes = getDateTimes(region);
            if (!dateTimes) {
              return;
            }
            let nextThursday = dateTimes.nextThursday;
            newBoss.done = nextThursday.toDate();
          }
        }
      }

      localStorage.setItem("user", JSON.stringify(newUser));
      setCharacters(newUser.characters);
      setChecked((prevState) => !prevState);
    }
  }

  return (
    <div className={`col-span-1 row-span-1 flex items-center justify-center`}>
      {boss && characterPosition !== -1 && (
        <input
          id={Math.random().toString()}
          type="checkbox"
          className={`checkbox-accent checkbox checkbox-lg cursor-default border-info hover:cursor-pointer ${checked ? "hover:border-accent" : "hover:border-info"}`}
          checked={checked}
          onChange={handleCheckboxChange}
        />
      )}
    </div>
  );
}
