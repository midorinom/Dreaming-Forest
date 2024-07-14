"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { ActiveCharacterProps } from "@/app/lib/definitions/dashboard-definitions";
import type { Character } from "@/app/lib/definitions/general-definitions";

export default function ActiveCharacter({
  activeCharacter,
}: ActiveCharacterProps) {
  const [character, setCharacter] = useState<Character>({} as Character);

  useEffect(() => {
    setCharacter(activeCharacter);
  }, []);

  return (
    <div className="flex justify-center w-full h-full">
      <div className={"w-full h-full flex items-center gap-4 ml-8"}>
        {!character.ign ? (
          <span className="w-auto mx-auto loading loading-spinner text-accent h-1/2"></span>
        ) : (
          <>
            <div
              style={{
                position: "relative",
              }}
              className="h-4/5 w-[28%] ml-8"
            >
              <Image
                src={
                  character.image ? character.image : "/general/naked_char.png"
                }
                height={0}
                width={0}
                alt="Active Character"
                sizes="100vw"
                className="absolute w-full h-full"
              />
            </div>
            <div className="flex flex-col justify-center w-3/5">
              <div className="text-[2.75rem] text-neutral font-medium underline-dreamy-accent underline-offset-[8px]">
                {character.ign}
              </div>
              <div className="flex gap-2 text-3xl text-neutral">
                <div>Lv {character.level}</div>
                <div> {character.maplestoryClass}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
