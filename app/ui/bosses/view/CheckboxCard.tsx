"use client";
import { useState, useEffect } from "react";
import {
  CheckboxCardProps,
  Data,
} from "@/app/lib/definitions/bosses-definitions";
import { User } from "@/app/lib/definitions/general-definitions";
import { getDateTimes } from "@/app/lib/functions/utility-functions";

export default function CheckboxCard({
  boss,
  region,
  characterPosition,
  setCharacters,
  data,
  setData,
  charactersPage,
  column,
  bossesInfo,
  totalMeso,
  setTotalMeso,
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
          const newData: Data[] = JSON.parse(JSON.stringify(data));
          let meso: number = 0;

          if (region === "GMS") {
            meso = bossesInfo[boss?.bossesPosition].gms_meso;
          } else if (region === "MSEA") {
            meso = bossesInfo[boss?.bossesPosition].msea_meso;
          }

          if (checked) {
            newBoss.done = null;
            newData[charactersPage].subtotals[column] -= meso;
            setTotalMeso(totalMeso - meso);
          } else {
            const dateTimes = getDateTimes(region);
            if (!dateTimes) {
              return;
            }

            newBoss.done = dateTimes.nextThursday.toDate();
            newData[charactersPage].subtotals[column] += meso;
            setTotalMeso(totalMeso + meso);
          }

          setData(newData);
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
