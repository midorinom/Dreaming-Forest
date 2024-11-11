"use client";
import { ChangeEvent } from "react";
import type { LoginPasswordFieldProps } from "@/app/lib/definitions/welcome-definitions";
import { errorMessages } from "@/public/welcome/CreateAccount_error_message";

export default function PasswordField({
  setPassword,
  passwordError,
  setPasswordError
}: LoginPasswordFieldProps) {
  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    const passwordInput = e.target.value;
    const passwordRegex =
      /^[a-zA-Z0-9!@#\$%\^&\*\(\)_\+\-=\{\}\[\]\|\\:;"'<>,\.\?\/~`]*$/;

    if (!passwordRegex.test(passwordInput)) {
      setPassword("");
      setPasswordError(errorMessages.passwordRegex);
      return;
    }

    setPassword(passwordInput);
    setPasswordError("");
  }
  return (
    <div className="relative">
      <label
        className={`${
          passwordError ? "bg-error" : "bg-secondary"
        } input input-bordered flex items-center gap-2`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clip-rule="evenodd"
          />
        </svg>
        <input
          type="password"
          className="grow"
          placeholder="Password"
          onChange={handlePasswordChange}
          maxLength={15}
        />
      </label>
      {passwordError && (
        <span className="absolute left-0 top-full mt-0.5 text-sm text-error">
          {passwordError}
        </span>
      )}
    </div>
  );
}
