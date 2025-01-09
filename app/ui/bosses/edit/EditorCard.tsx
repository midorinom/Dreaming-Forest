"use client";
import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { EditorCardProps } from "@/app/lib/definitions/bosses-definitions";

export default function EditorCard({
  boss,
  bossesInfo,
  activeCharacter,
  setCharacters,
}: EditorCardProps) {
  const [modes, setModes] = useState<number[]>([]); // array of bossesPosition values
  const [mode, setMode] = useState<number>(0);

  useEffect(() => {
    if (!boss) {
      return;
    }

    const newModes = [];

    console.log(bossesInfo);

    for (const bossInfo of bossesInfo) {
      if (bossInfo.dashboard_position === boss.dashboardPosition) {
        newModes.push(bossInfo.bosses_position);
      }
    }

    newModes.sort((a, b) => {
      return b - a;
    }); // descending order
    setModes(newModes);

    for (let i = 0; i < newModes.length; i++) {
      if (boss.bossesPosition === newModes[i]) {
        setMode(i);
      }
    }
  }, [boss]);

  function handleModeChange(e: ChangeEvent<HTMLInputElement>) {
    const modeInput = parseInt(e.target.value);
    setMode(modeInput);
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div
        style={{
          position: "relative",
        }}
        className="row-span-2 flex h-full w-[28%] items-center justify-center"
      >
        <Image
          src={bossesInfo[boss.bossesPosition].bosses_image}
          height={0}
          width={0}
          alt="Character Image"
          sizes="100vw"
          className="absolute h-auto max-h-full w-full hover:cursor-pointer"
        />
      </div>
      <div className="flex h-full w-[35%] flex-col items-center justify-center gap-2">
        <select className="select select-sm h-[45%] w-3/4 max-w-xs bg-neutral bg-none p-0 text-center text-lg">
          <option>Solo</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
        {modes.length > 1 && (
          <input
            type="range"
            min={0}
            max={modes.length - 1}
            value={mode}
            className="range-base-100 range w-3/4 [--range-shdw:pink]"
            onChange={handleModeChange}
          />
        )}
      </div>
    </div>
  );
}
