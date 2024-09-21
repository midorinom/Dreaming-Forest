"use client";
import { ChangeEvent } from "react";
import type { WeeklyInputProps } from "@/app/lib/definitions/dashboard-definitions";

const WeeklyInput = ({ weekly, setWeekly }: WeeklyInputProps) => {
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const allowedCharactersRegex =
      /[^a-zA-Z0-9\s!@#$%^&*'"()_+=\[\]{}:,.?~|`\/-]/g;
    const newDescription = e.target.value.replace(allowedCharactersRegex, "");

    setWeekly({ ...weekly, description: newDescription });
  }

  return (
    <input
      type="text"
      className="input input-md input-bordered w-2/3 bg-neutral text-lg focus:outline-none"
      value={weekly.description}
      onChange={handleInputChange}
      maxLength={28}
    />
  );
};

export default WeeklyInput;
