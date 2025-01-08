"use client";
import { useRef, useState, useEffect } from "react";
import {
  BossesViewProps,
  Data,
} from "@/app/lib/definitions/bosses-definitions";
import { Character } from "@/app/lib/definitions/general-definitions";
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

  useEffect(() => {
    if (!isFirstRender.current) {
      return;
    }

    isFirstRender.current = false;
    const newData: Data[] = [];

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
            let meso: number = 0;

            if (region === "GMS") {
              meso = bossesInfo[boss.bossesPosition].gms_meso;
            } else if (region === "MSEA") {
              meso = bossesInfo[boss.bossesPosition].msea_meso;
            }

            newSubtotals[j] += meso;
            setTotalMeso((prevState) => prevState + meso);
          }
        }
      }

      const newDataItem: Data = {
        bossesList: newBossesList,
        subtotals: newSubtotals,
      };
      newData.push(newDataItem);
    }

    setData(newData);
    updateBossesList(newData);
  }, []);

  useEffect(() => {
    if (characters.length > 0) {
      // bossesList
      if (data.length > 0) {
        updateBossesList(data);
      }

      // currentPageCharacters
      const newCurrentPageCharacters: Character[] = [];
      const firstIndex = charactersPage * 5;
      const lastIndex = Math.min(5 * (charactersPage + 1), characters.length);

      for (let i = firstIndex; i < lastIndex; i++) {
        newCurrentPageCharacters.push(characters[i]);
      }

      setCurrentPageCharacters(newCurrentPageCharacters);

      // bossPage
      setBossesPage(0);
    }
  }, [charactersPage]);

  useEffect(() => {
    if (bossesList.length > 0) {
      setTotalBossesPages(Math.ceil(bossesList.length / 7));
    }
  }, [bossesList]);

  useEffect(() => {
    if (bossesList.length > 0) {
      const newCurrentPageBossesList: number[] = [];
      const firstIndex = bossesPage * 7;
      const lastIndex = Math.min(7 * (bossesPage + 1), bossesList.length);

      for (let i = firstIndex; i < lastIndex; i++) {
        newCurrentPageBossesList.push(bossesList[i]);
      }

      setCurrentPageBossesList(newCurrentPageBossesList);
    }
  }, [bossesList, bossesPage]);

  function updateBossesList(data: Data[]) {
    const bossesListSet: Set<number> = data[charactersPage].bossesList;
    const bossesListArray: number[] = Array.from(bossesListSet);

    bossesListArray.sort((a, b) => a - b); // ascending order
    setBossesList(bossesListArray);
  }

  return (
    <>
      {currentPageCharacters.length > 0 && (
        <div className="grid h-full w-full grid-cols-[2vw_20vw_1fr_2vw] grid-rows-[15vh_1fr_14vh]">
          <Characters
            characters={characters}
            currentPageCharacters={currentPageCharacters}
            charactersPage={charactersPage}
            setCharactersPage={setCharactersPage}
          />
          {currentPageBossesList.length > 0 && (
            <BossesList
              currentPageBossesList={currentPageBossesList}
              bossesInfo={bossesInfo}
              region={region}
            />
          )}
          <Checkboxes
            currentPageBossesList={currentPageBossesList}
            currentPageCharacters={currentPageCharacters}
            setCharacters={setCharacters}
            region={region}
          />
          <BossesPagination
            bossesPage={bossesPage}
            setBossesPage={setBossesPage}
            totalBossesPages={totalBossesPages}
          />
          {data.length > 0 && (
            <MesoTotals
              data={data}
              charactersPage={charactersPage}
              totalMeso={totalMeso}
            />
          )}
        </div>
      )}
    </>
  );
}
