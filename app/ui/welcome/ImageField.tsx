"use client";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import type { ImageFieldProps } from "@/app/lib/definitions/welcome-definitions";

export default function ImageField({ setUploadedFile }: ImageFieldProps) {
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

  return (
    <>
      <Image
        src={fileURL ? fileURL : "/general/naked_char.png"}
        height={0}
        width={0}
        alt="Naked Character"
        sizes="100vw"
        className="w-1/3 row-span-2 max-h-40 justify-self-center"
      />
      <div className="relative w-4/5 col-start-1 row-start-3 justify-self-center">
        <input
          id="image_upload"
          accept="image/*"
          type="file"
          className={`w-full file-input file-input-bordered ${
            error ? "file-input-error" : "file-input-secondary"
          }`}
          onChange={handleFileChange}
        />
        {error && (
          <span
            className="absolute text-sm text-error"
            style={{
              top: "99%",
              left: "0%",
            }}
          >
            {error}
          </span>
        )}
      </div>
    </>
  );
}
