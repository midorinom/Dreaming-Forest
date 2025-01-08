"use client";
import Image from "next/image";
import { CharacterCardProps } from "@/app/lib/definitions/bosses-definitions";

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div
      style={{
        position: "relative",
      }}
      className="flex h-4/5 w-[28%] items-center justify-center"
    >
      <Image
        src={character.image ? character.image : "/general/naked_char.png"}
        height={0}
        width={0}
        alt="Character Image"
        sizes="100vw"
        className="absolute h-full w-auto"
      />
    </div>
  );
}
