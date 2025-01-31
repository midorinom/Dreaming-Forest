"use client";
import { Section1Props } from "@/app/lib/definitions/progression-definitions";
import Character from "./Character";

export default function Section1({ activeCharacter }: Section1Props) {
  return (
    <div className="flex flex-col items-center">
      <Character activeCharacter={activeCharacter} />
    </div>
  );
}
