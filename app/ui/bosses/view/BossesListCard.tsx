"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  BossesListCardProps,
  Data,
} from "@/app/lib/definitions/bosses-definitions";
import { User } from "@/app/lib/definitions/general-definitions";
import { getDateTimes } from "@/app/lib/functions/utility-functions";
import _ from "lodash";

export default function BossesListCard({
  meso,
  image,
  data,
  currentPageCharacters,
  charactersPage,
  totalMeso,
  bossPosition,
  setCharacters,
  region,
  setData,
  bossesInfo,
  setTotalMeso,
  row,
  rowHovered,
}: BossesListCardProps) {
  const [grayscale, setGrayscale] = useState<boolean>(false);

  useEffect(() => {
    if (rowHovered !== -1 && rowHovered !== row) {
      setGrayscale(true);
    } else {
      setGrayscale(false);
    }
  }, [rowHovered]);

  function toggleRow() {
    const localUser = localStorage.getItem("user");
    let allDone: boolean = true;
    const newData: Data[] = _.cloneDeep(data);
    let newTotalMeso: number = totalMeso;

    if (localUser) {
      const newUser: User = JSON.parse(localUser);

      // First Iteration to look for any unchecked checkboxes
      for (let i = 0; i < 5; i++) {
        if (!currentPageCharacters[i]) {
          break;
        }

        const newBoss = newUser.characters[
          currentPageCharacters[i].position
        ].bosses.find((boss) => boss.bossesPosition === bossPosition);

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
                bossesInfo[bossPosition].gms_meso / newBoss.partySize,
              );
            } else if (region === "MSEA") {
              meso = Math.ceil(
                bossesInfo[bossPosition].msea_meso / newBoss.partySize,
              );
            }

            newData[charactersPage].subtotals[i] += meso;
            newTotalMeso += meso;
          }
        }
      }

      // All checkboxes in the column are checked. Iterate again to uncheck all of them
      if (allDone) {
        for (let i = 0; i < 5; i++) {
          if (!currentPageCharacters[i]) {
            break;
          }

          const newBoss = newUser.characters[
            currentPageCharacters[i].position
          ].bosses.find((boss) => boss.bossesPosition === bossPosition);

          if (newBoss && newBoss.done) {
            newBoss.done = null;

            let meso: number = 0;
            if (region === "GMS") {
              meso = Math.ceil(
                bossesInfo[bossPosition].gms_meso / newBoss.partySize,
              );
            } else if (region === "MSEA") {
              meso = Math.ceil(
                bossesInfo[bossPosition].msea_meso / newBoss.partySize,
              );
            }

            newData[charactersPage].subtotals[i] -= meso;
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
    <>
      <div
        className={`${!grayscale ? "bg-neutral" : "bg-info"} col-start-1 w-[90%] rounded-md p-1 text-center text-xl hover:cursor-pointer`}
        onClick={toggleRow}
      >
        {meso.toLocaleString()}
      </div>
      <div
        style={{
          position: "relative",
        }}
        className="col-start-2 flex h-full w-full items-center justify-center"
      >
        <Image
          src={image ? image : "/general/naked_char.png"}
          height={0}
          width={0}
          alt="Boss Image"
          sizes="100vw"
          className={`${grayscale && "grayscale"} absolute h-auto w-[70%] hover:cursor-pointer`}
          onClick={toggleRow}
        />
      </div>
    </>
  );
}
