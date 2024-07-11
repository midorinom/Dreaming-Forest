"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { ActiveCharacterProps } from "@/app/lib/definitions/dashboard-definitions";

export default function ActiveCharacter({ userDetails }: ActiveCharacterProps) {
  const [hasImage, setHasImage] = useState<boolean>(false);
  const activeCharacter = userDetails?.characters[0];

  useEffect(() => {
    if (activeCharacter.image) {
      setHasImage(true);
    }
  }, []);

  return (
    <div className="w-full h-full flex justify-center">
      <div
        className={`w-full h-full flex items-center ${
          !hasImage && "gap-8 ml-8"
        }`}
      >
        <Image
          src={
            activeCharacter.image
              ? activeCharacter.image
              : "/general/naked_char.png"
          }
          height={0}
          width={0}
          alt="Active Character"
          sizes="100vw"
          className="h-4/5 w-auto row-span-2 ml-8 justify-self-center"
        />
        <div className="w-3/5 flex flex-col gap-4 justify-center">
          <div className="text-6xl text-neutral font-medium underline-dreamy-accent underline-offset-[15px]">
            {activeCharacter.ign}
          </div>
          <div className="text-2xl text-neutral flex gap-2">
            <div>Lv {activeCharacter.level}</div>
            <div> {activeCharacter.maplestoryClass}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
