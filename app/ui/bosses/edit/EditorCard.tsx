"use client";
import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { EditorCardProps } from "@/app/lib/definitions/bosses-definitions";
import { Character, User } from "@/app/lib/definitions/general-definitions";

export default function EditorCard({
  boss,
  bossesInfo,
  activeCharacter,
  setCharacters,
}: EditorCardProps) {
  const [modes, setModes] = useState<number[]>([]); // array of bossesPosition values
  const [partySize, setPartySize] = useState<string>("Solo");
  const [mode, setMode] = useState<number>(0);

  useEffect(() => {
    if (!boss) {
      return;
    }

    // Party Size
    if (boss.partySize === 1) {
      setPartySize("Solo");
    } else {
      setPartySize(boss.partySize.toString());
    }

    // Modes
    const newModes = [];
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

  function handlePartySizeChange(e: ChangeEvent<HTMLSelectElement>) {
    setPartySize(e.target.value);
    updateBosses(e.target.value, mode);
  }

  function handleModeChange(e: ChangeEvent<HTMLInputElement>) {
    const modeInput = parseInt(e.target.value);
    setMode(modeInput);
    updateBosses(partySize, modeInput);
  }

  function updateBosses(partySizeInput: string, modeInput: number) {
    const localUser = localStorage.getItem("user");

    if (localUser) {
      const newUser: User = JSON.parse(localUser);
      for (const newBoss of newUser.characters[activeCharacter.position]
        .bosses) {
        if (newBoss.dashboardPosition === boss.dashboardPosition) {
          let newPartySize = 1;
          if (partySizeInput !== "Solo") {
            newPartySize = parseInt(partySizeInput);
          }

          newBoss.partySize = newPartySize;
          newBoss.bossesPosition = modes[modeInput];
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
    }
  }

  return (
    <div className="flex w-full items-center justify-center">
      {modes.length > 0 && (
        <>
          <div
            style={{
              position: "relative",
            }}
            className="row-span-2 flex h-full w-[29%] items-center justify-center"
          >
            <Image
              src={bossesInfo[modes[mode]].bosses_image}
              height={0}
              width={0}
              alt="Character Image"
              sizes="100vw"
              className="absolute h-auto max-h-full w-full"
            />
          </div>
          <div className="flex h-full w-[35%] flex-col items-center justify-center gap-2">
            <select
              className="select select-sm h-[45%] w-3/4 max-w-xs bg-neutral bg-none p-0 text-center text-lg"
              onChange={handlePartySizeChange}
              value={partySize}
            >
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
        </>
      )}
    </div>
  );
}
