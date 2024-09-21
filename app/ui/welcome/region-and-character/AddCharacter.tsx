"use client";
import { useState, useEffect } from "react";
import ImageField from "./ImageField";
import IgnField from "./IgnField";
import LevelField from "./LevelField";
import ClassField from "./ClassField";
import type { AddCharacterProps } from "@/app/lib/definitions/welcome-definitions";
import type { Character } from "@/app/lib/definitions/general-definitions";

export default function AddCharacter({
  setUploadedFile,
  character,
  setCharacter,
}: AddCharacterProps) {
  const [ign, setIgn] = useState<string>("");
  const [level, setLevel] = useState<number>(0);
  const [maplestoryClass, setMaplestoryClass] = useState<string>("");

  useEffect(() => {
    if (ign || level || maplestoryClass) {
      const newCharacter: Character = { ...character };

      if (character.ign !== ign) {
        newCharacter.ign = ign;
      }

      if (character.level !== level) {
        newCharacter.level = level;
      }

      if (character.maplestoryClass !== maplestoryClass) {
        newCharacter.maplestoryClass = maplestoryClass;
      }

      setCharacter(newCharacter);
    }
  }, [ign, level, maplestoryClass]);

  return (
    <div className="relative grid min-h-64 grid-cols-2 grid-rows-3 items-center">
      <ImageField setUploadedFile={setUploadedFile} />
      <IgnField setIgn={setIgn} />
      <LevelField level={level} setLevel={setLevel} />
      <ClassField setMaplestoryClass={setMaplestoryClass} />
    </div>
  );
}
