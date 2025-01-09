"use client";
import { useState, useEffect } from "react";
import _ from "lodash";
import {
  CheckboxCardProps,
  Data,
} from "@/app/lib/definitions/bosses-definitions";
import { Character, User } from "@/app/lib/definitions/general-definitions";
import { getDateTimes } from "@/app/lib/functions/utility-functions";

export default function CheckboxCard({
  boss,
  region,
  characterPosition,
  setCharacters,
  data,
  setData,
  charactersPage,
  row,
  column,
  bossesInfo,
  totalMeso,
  setTotalMeso,
  setRowHovered,
}: CheckboxCardProps) {
  const [checked, setChecked] = useState<boolean>(
    boss ? (boss.done ? true : false) : false,
  );

  useEffect(() => {
    if (boss) {
      setChecked(boss ? (boss.done ? true : false) : false);
    }
  }, [boss]);

  function handleCheckboxChange() {
    const localUser = localStorage.getItem("user");

    if (localUser) {
      const newUser: User = JSON.parse(localUser);

      for (const newBoss of newUser.characters[characterPosition].bosses) {
        if (newBoss.bossesPosition === boss?.bossesPosition) {
          const newData: Data[] = _.cloneDeep(data);
          let meso: number = 0;

          if (region === "GMS") {
            meso = Math.ceil(
              bossesInfo[boss?.bossesPosition].gms_meso / newBoss.partySize,
            );
          } else if (region === "MSEA") {
            meso = Math.ceil(
              bossesInfo[boss?.bossesPosition].msea_meso / newBoss.partySize,
            );
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

      const newCharacters: Character[] = [];
      for (const character of newUser.characters) {
        if (character.bosses.length > 0 && character.tracking.bosses) {
          newCharacters.push(character);
        }
      }
      setCharacters(newCharacters);
      setChecked((prevState) => !prevState);
    }
  }

  return (
    <div className={`col-span-1 row-span-1 flex items-center justify-center`}>
      {boss && characterPosition !== -1 && (
        <input
          id={`row_${row}_col_${column}`}
          type="checkbox"
          className={`checkbox-accent checkbox checkbox-lg cursor-default border-info hover:cursor-pointer ${checked ? "hover:border-accent" : "hover:border-info"}`}
          checked={checked}
          onChange={handleCheckboxChange}
          onMouseEnter={() => {
            setRowHovered(row);
          }}
          onMouseLeave={() => setRowHovered(-1)}
        />
      )}
    </div>
  );
}
