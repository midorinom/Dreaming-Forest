"use client";
import { ChangeEvent } from "react";
import type { DailyInputProps } from "@/app/lib/definitions/dashboard-definitions";

const DailyInput = ({ daily, setDaily }: DailyInputProps) => {
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const allowedCharactersRegex =
      /[^a-zA-Z0-9\s!@#$%^&*'"()_+=\[\]{}:,.?~|`\/-]/g;
    const newDescription = e.target.value.replace(allowedCharactersRegex, "");

    setDaily({ ...daily, description: newDescription });
  }

  return (
    <input
      type="text"
      className="input input-md input-bordered w-3/4 bg-neutral text-lg focus:outline-none"
      value={daily.description}
      onChange={handleInputChange}
      maxLength={28}
    />
  );
};

export default DailyInput;
