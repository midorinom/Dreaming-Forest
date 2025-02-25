"use client";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import type { IgnFieldProps } from "@/app/lib/definitions/characters-definitions";

export default function IgnField({ setIgn, submitClicked }: IgnFieldProps) {
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const ignRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (submitClicked) {
      if (ignRef.current) {
        ignRef.current.value = "";
      }
      setIgn("");
    }
  }, [submitClicked]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const ignInput = e.target.value;
    const alphanumericRegex = /^[a-zA-Z0-9À-ÿ]*$/; // Alphanumeric regex with accents

    if (!alphanumericRegex.test(ignInput)) {
      setIgn("");
      setIsInvalid(true);
      return;
    }

    setIgn(ignInput);
    setIsInvalid(false);
  }

  return (
    <div className="relative col-start-2 row-start-1 w-3/5">
      <input
        type="text"
        id="ign_input"
        className={`block w-full grow appearance-none rounded-t-lg border-0 border-b-2 bg-neutral px-2.5 pb-2.5 pt-5 text-base text-primary-content ${
          isInvalid
            ? "border-error focus:border-error"
            : "border-secondary focus:border-secondary"
        } peer focus:outline-none focus:ring-0`}
        placeholder=""
        maxLength={12}
        onChange={handleChange}
        ref={ignRef}
      />
      <label
        htmlFor="ign_input"
        className={`absolute text-base ${
          isInvalid
            ? "text-error peer-focus:text-error"
            : "text-secondary peer-focus:text-secondary"
        } start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4`}
      >
        IGN
      </label>
      {isInvalid && (
        <span className="absolute text-sm text-error">Invalid IGN</span>
      )}
    </div>
  );
}
