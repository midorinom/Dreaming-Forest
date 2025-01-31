"use client";
import Image from "next/image";
import { CharacterProps } from "@/app/lib/definitions/progression-definitions";

export default function Character({ activeCharacter }: CharacterProps) {
  return (
    <div className="w-max-content flex h-[24%] flex-col">
      <div
        style={{
          position: "relative",
        }}
        className="flex h-full w-full items-center justify-center"
      >
        <Image
          src={
            activeCharacter.image
              ? activeCharacter.image
              : "/general/naked_char.png"
          }
          height={0}
          width={0}
          alt="Character Image"
          sizes="100vw"
          className="absolute h-full w-auto"
        />
      </div>
      <span>
        Lv {activeCharacter.level} {activeCharacter.maplestoryClass}
      </span>
    </div>
  );
}
