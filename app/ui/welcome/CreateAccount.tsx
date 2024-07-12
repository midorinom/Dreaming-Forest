"use client";
import { useState, useEffect } from "react";
import type { CreateAccountProps } from "@/app/lib/definitions/welcome-definitions";
import { errorMessages } from "@/public/welcome/CreateAccount_error_message";
import UsernameField from "./UsernameField";
import PasswordField from "./PasswordField";
import ConfirmPasswordField from "./ConfirmPasswordField";

export default function CreateAccount({ setDone }: CreateAccountProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError(errorMessages.confirmPassword);
    } else {
      setConfirmPasswordError("");
    }
  }, [password, confirmPassword]);

  return (
    <div className="flex flex-col items-center w-1/4">
      <div className="flex flex-col items-center gap-3 min-h-64 collapse collapse-open bg-base-100">
        <div className="text-xl font-medium collapse-title underline-offset-8 underline-elodin-neutral">
          Create Account
        </div>
        <div className="flex flex-col gap-8">
          <UsernameField setUsername={setUsername} />
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
      <div className="flex justify-between w-full mt-5">
        <button
          className="text-xl font-medium rounded-full btn btn-lg glass btn-warning text-primary-content"
          onClick={() => setDone(true)}
        >
          Skip
        </button>
        <button
          className="text-xl font-medium rounded-full btn btn-lg glass btn-accent text-primary-content"
          disabled={
            username && password && confirmPassword && !confirmPasswordError
              ? false
              : true
          }
          onClick={() => setDone(true)}
        >
          <img
            src="/general/butterfly_logo.png"
            alt="My Icon"
            className="h-7 w-7"
          />
          Create
        </button>
      </div>
    </div>
  );
}
