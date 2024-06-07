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
  const [error, setError] = useState<string>("");

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const MAX_FILE_SIZE = 1024 * 10; // 10KB

    if (e.target.files) {
      const file = e.target.files[0];

      if (file.size > MAX_FILE_SIZE) {
        setError("File size exceeds 10KB");
        setUploadedFile(null);
      } else {
        setError("");
        setUploadedFile(file);
      }
    }
  }

  return (
    <form className="relative min-h-64 grid grid-cols-2 grid-rows-3 gap-4 items-center">
      <Image
        src={
          uploadedFile ? URL.createObjectURL(uploadedFile) : "/naked_char.png"
        }
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
          className={`w-full file-input file-input-bordered file-input-${
            error ? "error" : "accent"
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
      <ClassField />
    </form>
  );
}
