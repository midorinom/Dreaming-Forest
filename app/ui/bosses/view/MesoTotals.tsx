"use client";
import {
  MesoTotalsProps,
  Data,
} from "@/app/lib/definitions/bosses-definitions";
import { Character, User } from "@/app/lib/definitions/general-definitions";
import { getDateTimes } from "@/app/lib/functions/utility-functions";
import _ from "lodash";

export default function MesoTotals({
  data,
  currentPageCharacters,
  charactersPage,
  totalMeso,
  bossesList,
  setCharacters,
  region,
  setData,
  bossesInfo,
  setTotalMeso,
}: MesoTotalsProps) {
  function toggleByCharacter(characterColumn: number) {
    const localUser = localStorage.getItem("user");
    let allDone: boolean = true;
    const newData: Data[] = _.cloneDeep(data);
    let newTotalMeso: number = totalMeso;

    if (localUser) {
      const newUser: User = JSON.parse(localUser);

      // First Iteration to look for any unchecked checkboxes
      for (const currentRowBoss of bossesList) {
        const newBoss = newUser.characters[
          currentPageCharacters[characterColumn].position
        ].bosses.find((boss) => boss.bossesPosition === currentRowBoss);

        if (newBoss) {
          if (!newBoss.done) {
            allDone = false;

            const dateTimes = getDateTimes(region);
            if (!dateTimes) {
              return;
            }

            newBoss.done = dateTimes.nextThursday.toDate();
            let meso: number = 0;
            if (region === "GMS") {
              meso = Math.ceil(
                bossesInfo[currentRowBoss].gms_meso / newBoss.partySize,
              );
            } else if (region === "MSEA") {
              meso = Math.ceil(
                bossesInfo[currentRowBoss].msea_meso / newBoss.partySize,
              );
            }

            newData[charactersPage].subtotals[characterColumn] += meso;
            newTotalMeso += meso;
          }
        }
      }

      // All checkboxes in the column are checked. Iterate again to uncheck all of them
      if (allDone) {
        for (const currentRowBoss of bossesList) {
          const newBoss = newUser.characters[
            currentPageCharacters[characterColumn].position
          ].bosses.find((boss) => boss.bossesPosition === currentRowBoss);

          if (newBoss && newBoss.done) {
            newBoss.done = null;

            let meso: number = 0;
            if (region === "GMS") {
              meso = Math.ceil(
                bossesInfo[currentRowBoss].gms_meso / newBoss.partySize,
              );
            } else if (region === "MSEA") {
              meso = Math.ceil(
                bossesInfo[currentRowBoss].msea_meso / newBoss.partySize,
              );
            }

            newData[charactersPage].subtotals[characterColumn] -= meso;
            newTotalMeso -= meso;
          }
        }
      }

      setData(newData);
      localStorage.setItem("user", JSON.stringify(newUser));
      setTotalMeso(newTotalMeso);

      const newCharacters: Character[] = [];
      for (const character of newUser.characters) {
        if (character.bosses.length > 0 && character.tracking.bosses) {
          newCharacters.push(character);
        }
      }
      setCharacters(newCharacters);
    }
  }

  return (
    <div className="col-span-1 col-start-3 row-start-3 grid h-full w-[96.5%] grid-cols-5 grid-rows-2 items-center justify-items-center justify-self-center p-0.5">
      <div
        className="col-span-1 row-span-1 row-start-1 w-3/4 rounded-md bg-secondary p-1 text-center text-xl hover:cursor-pointer"
        onClick={() => {
          toggleByCharacter(0);
        }}
      >
        {data[charactersPage].subtotals[0].toLocaleString()}
      </div>
      {data[charactersPage].subtotals[1] !== -1 && (
        <div
          className="col-span-1 row-span-1 row-start-1 w-3/4 rounded-md bg-secondary p-1 text-center text-xl hover:cursor-pointer"
          onClick={() => {
            toggleByCharacter(1);
          }}
        >
          {data[charactersPage].subtotals[1].toLocaleString()}
        </div>
      )}
      {data[charactersPage].subtotals[2] !== -1 && (
        <div
          className="col-span-1 row-span-1 row-start-1 w-3/4 rounded-md bg-secondary p-1 text-center text-xl hover:cursor-pointer"
          onClick={() => {
            toggleByCharacter(2);
          }}
        >
          {data[charactersPage].subtotals[2].toLocaleString()}
        </div>
      )}
      {data[charactersPage].subtotals[3] !== -1 && (
        <div
          className="col-span-1 row-span-1 row-start-1 w-3/4 rounded-md bg-secondary p-1 text-center text-xl hover:cursor-pointer"
          onClick={() => {
            toggleByCharacter(3);
          }}
        >
          {data[charactersPage].subtotals[3].toLocaleString()}
        </div>
      )}
      {data[charactersPage].subtotals[4] !== -1 && (
        <div
          className="col-span-1 row-span-1 row-start-1 w-3/4 rounded-md bg-secondary p-1 text-center text-xl hover:cursor-pointer"
          onClick={() => {
            toggleByCharacter(4);
          }}
        >
          {data[charactersPage].subtotals[4].toLocaleString()}
        </div>
      )}
      <div className="col-span-1 row-start-2 w-3/4 rounded-md bg-base-100 p-1 text-center text-xl">
        {totalMeso.toLocaleString()}
      </div>
    </div>
  );
}
