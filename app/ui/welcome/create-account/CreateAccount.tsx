"use client";
import { useState, useEffect } from "react";
import type { CreateAccountProps } from "@/app/lib/definitions/welcome-definitions";
import { errorMessages } from "@/public/welcome/CreateAccount_error_message";
import UsernameField from "./UsernameField";
import PasswordField from "./PasswordField";
import ConfirmPasswordField from "./ConfirmPasswordField";

export default function CreateAccount({
  setDone,
  username,
  setUsername,
  password,
  setPassword,
}: CreateAccountProps) {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError(errorMessages.confirmPassword);
    } else {
      setConfirmPasswordError("");
    }
  }, [password, confirmPassword]);

  function handleSubmit() {
    setDone(true);
  }

  return (
    <div className="flex w-1/4 flex-col items-center">
      <div className="collapse collapse-open flex min-h-64 flex-col items-center gap-3 bg-base-100">
        <div className="collapse-title text-xl font-medium underline-offset-8 underline-elodin-neutral">
          Create Account
        </div>
        <div className="flex flex-col gap-8">
          <UsernameField
            setUsername={setUsername}
            usernameError={usernameError}
            setUsernameError={setUsernameError}
          />
          <PasswordField
            setPassword={setPassword}
            confirmPasswordError={confirmPasswordError}
          />
          <ConfirmPasswordField
            setConfirmPassword={setConfirmPassword}
            confirmPasswordError={confirmPasswordError}
          />
        </div>
      </div>
      <div className="mt-5 flex w-full justify-between">
        <button
          className="btn glass btn-warning btn-lg rounded-full text-xl font-medium text-primary-content"
          onClick={() => setDone(true)}
        >
          Skip
        </button>
        <button
          className="btn glass btn-accent btn-lg rounded-full text-xl font-medium text-primary-content"
          disabled={
            username && password && confirmPassword && !confirmPasswordError
              ? false
              : true
          }
          onClick={() => handleSubmit()}
        >
          <img
            src="/general/ui_icons/butterfly_logo.png"
            alt="Butterfly Logo"
            className="h-7 w-7"
          />
          Create
        </button>
      </div>
    </div>
  );
}
