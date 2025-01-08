"use client";
import { useState } from "react";
import { CheckboxCardProps } from "@/app/lib/definitions/bosses-definitions";

export default function CheckboxCard({
  boss,
  characterPosition,
  setCharacters,
}: CheckboxCardProps) {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <div className={`col-span-1 row-span-1 flex items-center justify-center`}>
      {boss && characterPosition !== -1 && (
        <input
          id={Math.random().toString()}
          type="checkbox"
          className={`checkbox-accent checkbox checkbox-lg cursor-default border-info hover:cursor-pointer ${checked ? "hover:border-accent" : "hover:border-info"}`}
          checked={checked}
          onChange={() => setChecked((prevState) => !prevState)}
        />
      )}
    </div>
  );
}
