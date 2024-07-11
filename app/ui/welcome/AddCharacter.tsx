"use client";
import { useState, useEffect } from "react";
import ImageField from "./ImageField";
import IgnField from "./IgnField";
import LevelField from "./LevelField";
import ClassField from "./ClassField";
import type { AddCharacterProps } from "@/app/lib/definitions/welcome-definitions";
import type { CharacterDetails } from "@/app/lib/definitions/general-definitions";

export default function AddCharacter({
  characterDetails,
  setCharacterDetails,
}: AddCharacterProps) {
  const [ign, setIgn] = useState<string>("");
  const [level, setLevel] = useState<number>(0);
  const [maplestoryClass, setMaplestoryClass] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    if (uploadedFile || ign || level || maplestoryClass) {
      const newCharacterDetails: CharacterDetails = { ...characterDetails };

      if (characterDetails.image !== uploadedFile) {
        newCharacterDetails.image = uploadedFile;
      }

      if (characterDetails.ign !== ign) {
        newCharacterDetails.ign = ign;
      }

      if (characterDetails.level !== level) {
        newCharacterDetails.level = level;
      }

      if (characterDetails.maplestoryClass !== maplestoryClass) {
        newCharacterDetails.maplestoryClass = maplestoryClass;
      }

      setCharacterDetails(newCharacterDetails);
    }
  }, [uploadedFile, ign, level, maplestoryClass]);

  return (
    <div className="relative min-h-64 grid grid-cols-2 grid-rows-3 gap-4 items-center">
      <ImageField setUploadedFile={setUploadedFile} />
      <IgnField setIgn={setIgn} />
      <LevelField level={level} setLevel={setLevel} />
      <ClassField setMaplestoryClass={setMaplestoryClass} />
    </div>
  );
}
