"use client";
import { CreateAccountButtonProps } from "@/app/lib/definitions/settings-definitions";

export default function CreateAccount({ user }: CreateAccountButtonProps) {
  function handleClick() {
    // Sync Data
  }

  return (
    <button
      className="btn btn-accent h-16 w-1/5 rounded-full text-xl font-medium text-primary-content"
      onClick={handleClick}
    >
      Create Account
    </button>
  );
}
