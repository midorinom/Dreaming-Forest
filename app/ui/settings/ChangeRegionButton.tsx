"use client";
import { ChangeRegionButtonProps } from "@/app/lib/definitions/settings-definitions";

export default function ChangeRegionButton({ user }: ChangeRegionButtonProps) {
  function handleClick() {}

  return (
    <button
      className="btn btn-accent h-16 w-1/5 rounded-full text-xl font-medium text-primary-content"
      onClick={handleClick}
    >
      Change Region
    </button>
  );
}
