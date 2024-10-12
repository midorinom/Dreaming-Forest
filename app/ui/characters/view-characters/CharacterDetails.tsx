"use client";
import type { CharacterDetailsProps } from "@/app/lib/definitions/characters-definitions";
import Image from "next/image";

export default function CharacterDetails({ character }: CharacterDetailsProps) {
  return (
    <div
      className={
        "flex h-full w-full items-center gap-4 overflow-auto scrollbar-hide"
      }
    >
      {!character.ign ? (
        <span className="loading loading-spinner mx-auto h-1/2 w-auto text-accent"></span>
      ) : (
        <>
          <div
            style={{
              position: "relative",
            }}
            className="ml-8 h-4/5 w-[28%]"
          >
            <Image
              src={
                character.image ? character.image : "/general/naked_char.png"
              }
              height={0}
              width={0}
              alt="Character Image"
              sizes="100vw"
              className="absolute h-full w-full"
            />
          </div>
          <div className="flex w-3/5 flex-col justify-center">
            <div
              className={`text-[2.75rem] font-medium text-neutral underline-offset-[8px] ${character.position % 4 === 0 || character.position % 4 === 3 ? "underline-dreamy-base-100" : "underline-dreamy-accent"}`}
            >
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
  );
}
