"use client";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import IgnField from "./IgnField";
import LevelField from "./LevelField";
import ClassField from "./ClassField";

export default function AddCharacter() {
  const [ign, setIgn] = useState<string>("");
  const [level, setLevel] = useState<number>(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>();

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      setUploadedFile(file);
    }
  }

  return (
    <form className="grid grid-cols-2 grid-rows-3 gap-4 items-center">
      {uploadedFile && (
        <Image
          src="/naked_char.png"
          height={0}
          width={0}
          alt="Naked Character"
          sizes="100vw"
          className="w-1/3 h-auto row-span-2 justify-self-center"
        />
      )}
      <input
        type="file"
        className={`file-input file-input-bordered file-input-accent w-4/5 max-w-xs col-start-1 row-start-${
          uploadedFile ? "3" : "2"
        } justify-self-center`}
        onChange={handleFileChange}
      />
      <IgnField setIgn={setIgn} />
      <LevelField level={level} setLevel={setLevel} />
      <ClassField />
    </form>
  );
}
