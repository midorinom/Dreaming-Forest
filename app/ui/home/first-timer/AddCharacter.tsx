"use client";
import { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import IgnField from "./IgnField";
import LevelField from "./LevelField";
import ClassField from "./ClassField";
import {
  AddCharacterProps,
  CharacterDetails,
} from "@/app/lib/definitions/first-timer-definitions";

export default function AddCharacter({
  characterDetails,
  setCharacterDetails,
}: AddCharacterProps) {
  const [ign, setIgn] = useState<string>("");
  const [level, setLevel] = useState<number>(0);
  const [maplestoryClass, setMaplestoryClass] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<string>("");
  const [error, setError] = useState<string>("");

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const MAX_FILE_SIZE = 1024 * 10; // 10KB

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (fileURL) {
        URL.revokeObjectURL(fileURL);
      }

      if (file.size > MAX_FILE_SIZE) {
        setError("File size exceeds 10KB");
        setUploadedFile(null);
      } else {
        if (error) {
          setError("");
        }
        setUploadedFile(file);
        setFileURL(URL.createObjectURL(file));
      }
    }
  }

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
      console.log("Character Details Updated", newCharacterDetails);
    }
  }, [uploadedFile, ign, level, maplestoryClass]);

  return (
    <form className="relative min-h-64 grid grid-cols-2 grid-rows-3 gap-4 items-center">
      <Image
        src={fileURL ? fileURL : "/naked_char.png"}
        height={0}
        width={0}
        alt="Naked Character"
        sizes="100vw"
        className="w-1/3 max-h-40 row-span-2 justify-self-center"
      />
      <div className="w-4/5 col-start-1 row-start-3 justify-self-center relative">
        <input
          id="image_upload"
          accept="image/*"
          type="file"
          className={`w-full file-input file-input-bordered ${
            error ? "file-input-error" : "file-input-accent"
          }`}
          onChange={handleFileChange}
        />
        {error && (
          <span
            className="absolute left-1/2 text-sm text-error mt-1"
            style={{
              transform: "translateX(-110%)",
              top: "100%",
            }}
          >
            {error}
          </span>
        )}
      </div>
      <IgnField setIgn={setIgn} />
      <LevelField level={level} setLevel={setLevel} />
      <ClassField setMaplestoryClass={setMaplestoryClass} />
    </form>
  );
}
