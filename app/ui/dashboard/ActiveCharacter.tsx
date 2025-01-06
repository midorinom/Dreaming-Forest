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
  }, [activeCharacter]);

  return (
    <div className="flex h-full w-full justify-center">
      <div className={"ml-8 flex h-full w-full items-center gap-4"}>
        {!character.ign ? (
          <span className="loading loading-spinner mx-auto h-1/2 w-auto text-accent"></span>
        ) : (
          <>
            <div
              style={{
                position: "relative",
              }}
              className="ml-8 flex h-4/5 w-[28%] items-center justify-center"
            >
              <Image
                src={
                  character.image ? character.image : "/general/naked_char.png"
                }
                height={0}
                width={0}
                alt="Active Character"
                sizes="100vw"
                className="absolute h-full w-auto"
              />
            </div>
            <div className="flex w-3/5 flex-col justify-center">
              <div className="overflow-scroll text-[2.75rem] font-medium text-neutral underline-offset-[11px] underline-dreamy-accent scrollbar-hide">
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
