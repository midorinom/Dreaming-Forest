"use client";
import { ResetButtonProps } from "@/app/lib/definitions/general-definitions";

export default function SyncButton({ user }: ResetButtonProps) {
  function handleClick() {
    // Sync Data
  }

  return (
    <button
      className="btn btn-accent h-16 w-1/5 rounded-full text-xl font-medium text-primary-content"
      onClick={handleClick}
    >
      Sync Data
    </button>
  );
}
