"use client";
import { useState } from "react";
import { CheckboxCardProps } from "@/app/lib/definitions/bosses-definitions";

export default function CheckboxCard({}: CheckboxCardProps) {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <div>
      <input
        id={"1"}
        type="checkbox"
        className={`checkbox-accent checkbox checkbox-lg w-1/3 cursor-default border-info hover:cursor-pointer ${checked ? "hover:border-accent" : "hover:border-info"}`}
        checked={false}
      />
    </div>
  );
}
