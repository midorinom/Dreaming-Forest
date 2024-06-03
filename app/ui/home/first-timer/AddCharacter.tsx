"use client";
import { useState } from "react";
import Image from "next/image";
import IgnField from "./IgnField";
import LevelField from "./LevelField";
import ClassField from "./ClassField";

export default function AddCharacter() {
  const [ign, setIgn] = useState<string>("");
  const fileUploaded = true;

  return (
    <form className="grid grid-cols-2 grid-rows-3 gap-4 items-center">
      {fileUploaded && (
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
        className={`file-input file-input-bordered file-input-accent w-4/5 max-w-xs col-start-1 row-span-${
          fileUploaded ? "1" : "3"
        } justify-self-center`}
      />
      <IgnField setIgn={setIgn} />
      <LevelField />
      <ClassField />
    </form>
  );
}
