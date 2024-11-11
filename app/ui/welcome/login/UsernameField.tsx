"use client";
import { useState, ChangeEvent } from "react";
import type { LoginUsernameFieldProps } from "@/app/lib/definitions/welcome-definitions";
import { errorMessages } from "@/public/welcome/CreateAccount_error_message";

export default function UsernameField({
  setUsername,
}: LoginUsernameFieldProps) {
  const [usernameError, setUsernameError] = useState<string>("");

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    const usernameInput = e.target.value;
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;

    if (!alphanumericRegex.test(usernameInput)) {
      setUsername("");
      setUsernameError(errorMessages.usernameRegex);
      return;
    }

    setUsername(usernameInput);
    setUsernameError("");
  }

  return (
    <div className="relative">
      <label
        className={`${
          usernameError ? "bg-error" : "bg-primary"
        } input input-bordered flex items-center gap-2`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Username"
          onChange={handleUsernameChange}
          maxLength={15}
        />
      </label>
      {usernameError && (
        <span className="absolute left-0 top-full mt-0.5 text-sm text-error">
          {usernameError}
        </span>
      )}
    </div>
  );
}
