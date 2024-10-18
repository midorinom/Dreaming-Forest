"use client";
import Image from "next/image";
import { DeleteCharacterCardProps } from "@/app/lib/definitions/characters-definitions";

export default function DeleteCharacterCard({
  characterProp,
  characters,
  setCharacters,
}: DeleteCharacterCardProps) {
  return (
    <div className="flex h-4/5 w-full flex-col items-center justify-center">
      <div
        style={{
          position: "relative",
        }}
        className="flex h-full w-full items-center justify-center"
      >
        <Image
          src={
            characterProp.image
              ? characterProp.image
              : "/general/naked_char.png"
          }
          height={0}
          width={0}
          alt="Character Image"
          sizes="100vw"
          className="absolute h-full w-auto"
        />
      </div>
      <Image
        src="/general/ui_icons/delete_icon.png"
        height={0}
        width={0}
        alt="Delete Button"
        sizes="100vw"
        className="h-2/5 w-auto hover:cursor-pointer"
      />
    </div>
  );
}
