"use client";
import { useRef, useState, useEffect } from "react";
import {
  BossesViewProps,
  Data,
} from "@/app/lib/definitions/bosses-definitions";
import { Character, User } from "@/app/lib/definitions/general-definitions";
import { getDateTimes } from "@/app/lib/functions/utility-functions";
import dayjs from "dayjs";
import Characters from "./Characters";
import BossesList from "./BossesList";
import MesoTotals from "./MesoTotals";
import BossesPagination from "./BossesPagination";
import Checkboxes from "./Checkboxes";

export default function BossesView({
  bossesInfo,
  characters,
  setCharacters,
  region,
}: BossesViewProps) {
  const isFirstRender = useRef(true);
  const [currentPageCharacters, setCurrentPageCharacters] = useState<
    Character[]
  >([]);
  const [charactersPage, setCharactersPage] = useState<number>(0);
  const [data, setData] = useState<Data[]>([]); // indexed according to charactersPage
  const [bossesList, setBossesList] = useState<number[]>([]);
  const [currentPageBossesList, setCurrentPageBossesList] = useState<number[]>(
    [],
  );
  const [bossesPage, setBossesPage] = useState<number>(0);
  const [totalBossesPages, setTotalBossesPages] = useState<number>(1);
  const [totalMeso, setTotalMeso] = useState<number>(0);
  const [rowHovered, setRowHovered] = useState<number>(-1);

  useEffect(() => {
    if (!isFirstRender.current) {
      return;
    }

    isFirstRender.current = false;
    const newData: Data[] = [];
    let charactersChanged: boolean = false;

    // Iterate each page of characters
    for (let i = 0; i < Math.ceil(characters.length / 5); i++) {
      const newBossesList: Set<number> = new Set();
      const newSubtotals: number[] = [0, 0, 0, 0, 0];

      // Iterate through each character on the page
      for (let j = 0; j < 5; j++) {
        if (i * 5 + j === characters.length) {
          break; // no more characters remaining
        }

        // Iterate through each boss
        for (const boss of characters[i * 5 + j].bosses) {
          newBossesList.add(boss.bossesPosition);
          if (boss.done) {
            const dateTimes = getDateTimes(region);
            if (!dateTimes) {
              return;
            }
            const nextThursday = dateTimes.nextThursday;

            // Check whether 1 week has passed
            if (dayjs(nextThursday).diff(dayjs(boss.done), "week") < 1) {
              let meso: number = 0;

              if (region === "GMS") {
                meso = Math.ceil(
                  bossesInfo[boss.bossesPosition].gms_meso / boss.partySize,
                );
              } else if (region === "MSEA") {
                meso = Math.ceil(
                  bossesInfo[boss.bossesPosition].msea_meso / boss.partySize,
                );
              }

              newSubtotals[j] += meso;
              setTotalMeso((prevState) => prevState + meso);
            } else {
              // Reset boss.done to null since the reset date has passed
              const localUser = localStorage.getItem("user");

              if (localUser) {
                const newUser: User = JSON.parse(localUser);

                for (const newBoss of newUser.characters[i * 5 + j].bosses) {
                  if (newBoss.bossesPosition === boss.bossesPosition) {
                    newBoss.done = null;
                  }
                }

                localStorage.setItem("user", JSON.stringify(newUser));
                charactersChanged = true;
              }
            }
          }
        }
      }

      const newDataItem: Data = {
        bossesList: newBossesList,
        subtotals: newSubtotals,
      };
      newData.push(newDataItem);
    }

    // Flagged if any bosses were reset, update the characters state to reflect the new changes
    if (charactersChanged) {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        const newUser: User = JSON.parse(localUser);
        const newCharacters = newUser.characters;
        setCharacters(newCharacters);
      }
    }

    setData(newData);
    updateBossesList(newData);
  }, []);

  useEffect(() => {
    if (characters.length > 0) {
      // currentPageCharacters
      const newCurrentPageCharacters: Character[] = [];
      const firstIndex = charactersPage * 5;
      const lastIndex = Math.min(5 * (charactersPage + 1), characters.length);

      for (let i = firstIndex; i < lastIndex; i++) {
        newCurrentPageCharacters.push(characters[i]);
      }

      setCurrentPageCharacters(newCurrentPageCharacters);
    }
  }, [characters, charactersPage]);

  useEffect(() => {
    setBossesPage(0);
  }, [charactersPage]);

  useEffect(() => {
    if (currentPageCharacters.length > 0) {
      if (data.length > 0) {
        updateBossesList(data);
      }
    }
  }, [currentPageCharacters]);

  useEffect(() => {
    if (bossesList.length > 0) {
      setTotalBossesPages(Math.ceil(bossesList.length / 7));
    }
  }, [bossesList]);

  useEffect(() => {
    const newCurrentPageBossesList: number[] = [];
    const firstIndex = bossesPage * 7;
    const lastIndex = Math.min(7 * (bossesPage + 1), bossesList.length);

    for (let i = firstIndex; i < lastIndex; i++) {
      newCurrentPageBossesList.push(bossesList[i]);
    }
    setCurrentPageBossesList(newCurrentPageBossesList);
  }, [bossesList, bossesPage]);

  function updateBossesList(data: Data[]) {
    const bossesListSet: Set<number> = data[charactersPage].bossesList;
    const bossesListArray: number[] = Array.from(bossesListSet);
    bossesListArray.sort((a, b) => a - b); // ascending order
    setBossesList(bossesListArray);
  }

  return (
    <>
      {currentPageCharacters.length > 0 &&
        currentPageBossesList.length > 0 &&
        data.length > 0 && (
          <div className="grid h-full w-full grid-cols-[2vw_20vw_1fr_2vw] grid-rows-[15vh_1fr_14vh]">
            <Characters
              characters={characters}
              currentPageCharacters={currentPageCharacters}
              charactersPage={charactersPage}
              setCharactersPage={setCharactersPage}
              currentPageBossesList={currentPageBossesList}
              setCharacters={setCharacters}
              region={region}
              data={data}
              setData={setData}
              bossesInfo={bossesInfo}
              totalMeso={totalMeso}
              setTotalMeso={setTotalMeso}
            />
            <BossesList
              currentPageBossesList={currentPageBossesList}
              bossesInfo={bossesInfo}
              region={region}
              data={data}
              currentPageCharacters={currentPageCharacters}
              charactersPage={charactersPage}
              totalMeso={totalMeso}
              setCharacters={setCharacters}
              setData={setData}
              setTotalMeso={setTotalMeso}
              rowHovered={rowHovered}
            />
            <Checkboxes
              currentPageBossesList={currentPageBossesList}
              currentPageCharacters={currentPageCharacters}
              setCharacters={setCharacters}
              region={region}
              data={data}
              setData={setData}
              charactersPage={charactersPage}
              bossesInfo={bossesInfo}
              totalMeso={totalMeso}
              setTotalMeso={setTotalMeso}
              setRowHovered={setRowHovered}
            />
            <BossesPagination
              bossesPage={bossesPage}
              setBossesPage={setBossesPage}
              totalBossesPages={totalBossesPages}
            />
            <MesoTotals
              data={data}
              currentPageCharacters={currentPageCharacters}
              charactersPage={charactersPage}
              totalMeso={totalMeso}
              bossesList={bossesList}
              setCharacters={setCharacters}
              region={region}
              setData={setData}
              bossesInfo={bossesInfo}
              setTotalMeso={setTotalMeso}
            />
          </div>
        )}
    </>
  );
}
