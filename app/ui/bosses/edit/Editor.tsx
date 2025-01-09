"use client";
import { useState, useEffect, ReactElement, act } from "react";
import { EditorProps } from "@/app/lib/definitions/bosses-definitions";
import { Boss } from "@/app/lib/definitions/general-definitions";
import EditorCard from "./EditorCard";
import Pagination from "./Pagination";

export default function Editor({
  activeCharacter,
  characters,
  setCharacters,
  bossesInfo,
}: EditorProps) {
  const [bosses, setBosses] = useState<Boss[]>([]);
  const [currentPageBosses, setCurrentPageBosses] = useState<Boss[]>([]);
  const [editorCards, setEditorCards] = useState<ReactElement[]>([]);
  const [bossesPage, setBossesPage] = useState<number>(0);
  const [totalBossesPages, setTotalBossesPages] = useState<number>(1);

  useEffect(() => {
    setBossesPage(0);
  }, [activeCharacter]);

  useEffect(() => {
    // Form bosses list in ascending order of dashboard position
    const newBosses: Boss[] = JSON.parse(
      JSON.stringify(characters[activeCharacter.position].bosses),
    );
    newBosses.sort((a, b) => {
      return a.dashboardPosition - b.dashboardPosition;
    });
    setBosses(newBosses);

    // Total Bosses
    const totalBosses = characters[activeCharacter.position].bosses.length;
    setTotalBossesPages(Math.ceil(totalBosses / 16));
  }, [characters, activeCharacter]);

  useEffect(() => {
    const newCurrentPageBosses: Boss[] = [];

    for (let i = 0; i < 12; i++) {
      if (!bosses[bossesPage * 12 + i]) {
        break;
      }

      const newBoss = bosses[bossesPage * 12 + i];
      newCurrentPageBosses.push(newBoss);
    }

    setCurrentPageBosses(newCurrentPageBosses);
  }, [activeCharacter, bossesPage, bosses]);

  useEffect(() => {
    if (currentPageBosses.length === 0) {
      return;
    }
    const editorCardsArray: ReactElement[] = [];

    for (const boss of currentPageBosses) {
      editorCardsArray.push(
        <EditorCard
          key={boss.bossId}
          boss={boss}
          bossesInfo={bossesInfo}
          activeCharacter={activeCharacter}
          setCharacters={setCharacters}
        />,
      );
    }

    setEditorCards(editorCardsArray);
  }, [currentPageBosses]);

  return (
    <div className="collapse relative row-span-1 row-start-2 grid h-[95%] w-full grid-cols-[1fr_0.08fr] self-center bg-primary/85">
      <div className="grid h-full w-full grid-cols-3 grid-rows-4 gap-4 p-8">
        {editorCards.length > 0 && editorCards.map((editorCard) => editorCard)}
      </div>
      <Pagination
        bossesPage={bossesPage}
        setBossesPage={setBossesPage}
        totalBossesPages={totalBossesPages}
      />
    </div>
  );
}
