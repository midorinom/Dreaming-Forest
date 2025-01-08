"use client";
import Image from "next/image";
import {
  CharacterCardProps,
  Data,
} from "@/app/lib/definitions/bosses-definitions";
import { User } from "@/app/lib/definitions/general-definitions";
import { getDateTimes } from "@/app/lib/functions/utility-functions";
import _ from "lodash";

export default function CharacterCard({
  character,
  currentPageBossesList,
  setCharacters,
  region,
  data,
  setData,
  bossesInfo,
  totalMeso,
  setTotalMeso,
  charactersPage,
  characterColumn,
}: CharacterCardProps) {
  function toggleColumn() {
    const localUser = localStorage.getItem("user");
    let allDone: boolean = true;
    const newData: Data[] = _.cloneDeep(data);
    let newTotalMeso: number = totalMeso;

    if (localUser) {
      const newUser: User = JSON.parse(localUser);

      // First Iteration to look for any unchecked checkboxes
      for (const currentRowBoss of currentPageBossesList) {
        const newBoss = newUser.characters[character.position].bosses.find(
          (boss) => boss.bossesPosition === currentRowBoss,
        );

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
              meso = bossesInfo[currentRowBoss].gms_meso;
            } else if (region === "MSEA") {
              meso = bossesInfo[currentRowBoss].msea_meso;
            }

            newData[charactersPage].subtotals[characterColumn] += meso;
            newTotalMeso += meso;
          }
        }
      }

      // All checkboxes in the column are checked. Iterate again to uncheck all of them
      if (allDone) {
        for (const currentRowBoss of currentPageBossesList) {
          const newBoss = newUser.characters[character.position].bosses.find(
            (boss) => boss.bossesPosition === currentRowBoss,
          );

          if (newBoss && newBoss.done) {
            newBoss.done = null;

            let meso: number = 0;
            if (region === "GMS") {
              meso = bossesInfo[currentRowBoss].gms_meso;
            } else if (region === "MSEA") {
              meso = bossesInfo[currentRowBoss].msea_meso;
            }

            newData[charactersPage].subtotals[characterColumn] -= meso;
            newTotalMeso -= meso;
          }
        }
      }

      setData(newData);
      localStorage.setItem("user", JSON.stringify(newUser));
      setCharacters(newUser.characters);
      setTotalMeso(newTotalMeso);
    }
  }

  return (
    <div
      style={{
        position: "relative",
      }}
      className="flex h-[90%] w-1/5 items-center justify-center"
    >
      <Image
        src={character.image ? character.image : "/general/naked_char.png"}
        height={0}
        width={0}
        alt="Character Image"
        sizes="100vw"
        className="absolute h-full w-auto hover:cursor-pointer"
        onClick={toggleColumn}
      />
    </div>
  );
}
