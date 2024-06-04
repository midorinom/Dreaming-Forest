"use client";
import { useRef, ChangeEvent, useEffect } from "react";
import { LevelFieldProps } from "@/app/lib/definitions/first-timer-definitions";

export default function LevelField({ level, setLevel }: LevelFieldProps) {
  const textInputRef = useRef<HTMLInputElement | null>(null);
  const rangeInputRef = useRef<HTMLInputElement | null>(null);

  function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
    const levelInput = parseInt(e.target.value);

    if (isNaN(levelInput) || levelInput < 1) {
      if (textInputRef.current) {
        textInputRef.current.value = "";
      }
      setLevel(0);
    } else if (levelInput > 300) {
      e.target.value = "300";
      setLevel(300);
    } else {
      setLevel(levelInput);
      if (textInputRef.current) {
        textInputRef.current.value = levelInput.toString();
      }
    }
  }

  function handleRangeChange(e: ChangeEvent<HTMLInputElement>) {
    const levelInput = parseInt(e.target.value);
    setLevel(levelInput);
  }

  return (
    <div className="relative col-start-2 row-start-2 w-4/5 flex items-center gap-4">
      <input
        ref={textInputRef}
        id="level_input"
        type="text"
        className="grow block rounded-t-lg px-2.5 pb-2.5 pt-5 w-1/3 text-base text-primary-content bg-neutral dark:bg-neutral border-0 border-b-2 border-accent appearance-none dark:text-primary-content dark:border-accent dark:focus:border-accent focus:outline-none focus:ring-0 focus:border-accent peer"
        value={level ? level : ""}
        placeholder=""
        maxLength={3}
        onChange={handleTextChange}
      />
      <label
        htmlFor="level_input"
        className="absolute text-base text-accent dark:text-accent duration-0 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-accent peer-focus:dark:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
      >
        Lv
      </label>
      <input
        ref={rangeInputRef}
        type="range"
        min="200"
        max="300"
        value={level}
        className="range range-accent"
        onChange={handleRangeChange}
      />
    </div>
  );
}
