"use client";
import { useRef, useState, useEffect } from "react";
import {
  BossesViewProps,
  Data,
} from "@/app/lib/definitions/bosses-definitions";
import { Character } from "@/app/lib/definitions/general-definitions";
import Characters from "./Characters";
import MesoTotals from "./MesoTotals";

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
  const [bossesList, setBossesList] = useState<number[]>();
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
            const meso = bossesInfo[boss.bossesPosition].meso;
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
  }, []);

  useEffect(() => {
    if (characters.length > 0) {
      // bossesList
      if (data.length > 0) {
        const bossesListSet: Set<number> = data[charactersPage].bossesList;
        const bossesListArray: number[] = Array.from(bossesListSet);

        bossesListArray.sort((a, b) => b - a); // descending order
        setBossesList(bossesListArray);
      }

      // currentPageCharacters
      const newCurrentPageCharacters: Character[] = [];
      const firstIndex = charactersPage * 5;
      const lastIndex = Math.min(5 * (charactersPage + 1), characters.length);

      for (let i = firstIndex; i < lastIndex; i++) {
        newCurrentPageCharacters.push(characters[i]);
      }

      setCurrentPageCharacters(newCurrentPageCharacters);
    }
  }, [charactersPage]);

  return (
    <>
      {currentPageCharacters.length > 0 && (
        <div className="grid h-full w-full grid-cols-[20vw_1fr] grid-rows-[15vh_1fr_12vh]">
          <Characters
            characters={characters}
            currentPageCharacters={currentPageCharacters}
            charactersPage={charactersPage}
            setCharactersPage={setCharactersPage}
          />
          <div className="col-span-1 row-span-1 row-start-2 border-4 border-black"></div>
          <div className="col-start-2 row-span-1 row-start-2 border-4 border-white"></div>
          <div className="col-span-1 row-start-3 border-4 border-accent"></div>
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
