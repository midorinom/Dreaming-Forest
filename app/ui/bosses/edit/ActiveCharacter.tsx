"use client";
import Image from "next/image";
import { ActiveCharacterProps } from "@/app/lib/definitions/bosses-definitions";

export default function ActiveCharacter({
  activeCharacter,
}: ActiveCharacterProps) {
  return (
    <>
      <div className="h-full w-[12%] border-b-4 border-neutral">
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
            alt="Active Character Image"
            sizes="100vw"
            className="absolute h-full w-auto"
          />
        </div>
      </div>
    </>
  );
}
