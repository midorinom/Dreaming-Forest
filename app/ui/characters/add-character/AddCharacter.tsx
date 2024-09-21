"use client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import type { UUID } from "crypto";
import type { Character } from "@/app/lib/definitions/general-definitions";
import ImageField from "./ImageField";
import IgnField from "./IgnField";
import LevelField from "./LevelField";
import ClassField from "./ClassField";

export default function AddCharacter() {
  const [character, setCharacter] = useState<Character>({
    characterId: uuidv4() as UUID,
    image: "",
    ign: "",
    level: 0,
    maplestoryClass: "",
    dailies: [],
    weeklies: [],
    bosses: [],
    position: 0,
    tracking: {
      dailies: true,
      weeklies: true,
      bosses: true,
      progression: true,
    },
  } as Character);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
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
    <div className="flex items-center justify-center">
      <div className="flex h-1/2 min-h-64 w-1/2 flex-col gap-4">
        <div className="collapse relative grid h-4/5 grid-cols-2 grid-rows-3 items-center bg-primary">
          <ImageField setUploadedFile={setUploadedFile} />
          <IgnField setIgn={setIgn} />
          <LevelField level={level} setLevel={setLevel} />
          <ClassField setMaplestoryClass={setMaplestoryClass} />
        </div>
        <button className="btn btn-neutral w-1/3 self-end text-3xl text-info">
          Add Character
        </button>
      </div>
    </div>
  );
}
