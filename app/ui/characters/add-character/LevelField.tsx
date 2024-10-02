"use client";
import { useRef, ChangeEvent, useEffect } from "react";
import type { LevelFieldProps } from "@/app/lib/definitions/characters-definitions";

export default function LevelField({
  level,
  setLevel,
  displaySuccessMessage,
}: LevelFieldProps) {
  const textInputRef = useRef<HTMLInputElement | null>(null);
  const rangeInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (displaySuccessMessage) {
      if (textInputRef.current) {
        textInputRef.current.value = "";
      }
      if (rangeInputRef.current) {
        rangeInputRef.current.value = "";
      }
      setLevel(0);
    }
  }, [displaySuccessMessage]);

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
    <div className="relative col-start-2 row-start-2 flex w-4/5 items-center gap-4">
      <input
        ref={textInputRef}
        id="level_input"
        type="text"
        className="peer block w-1/3 grow appearance-none rounded-t-lg border-0 border-b-2 border-secondary bg-neutral px-2.5 pb-2.5 pt-5 text-base text-primary-content focus:border-secondary focus:outline-none focus:ring-0"
        value={level ? level : ""}
        placeholder=""
        maxLength={3}
        onChange={handleTextChange}
      />
      <label
        htmlFor="level_input"
        className="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-base text-secondary duration-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-secondary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
      >
        Lv
      </label>
      <input
        ref={rangeInputRef}
        type="range"
        min="200"
        max="300"
        value={level}
        className="range range-secondary"
        onChange={handleRangeChange}
      />
    </div>
  );
}
