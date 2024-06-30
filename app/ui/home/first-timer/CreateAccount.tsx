"use client";
import { useState, useEffect } from "react";
import { CreateAccountProps } from "@/app/lib/definitions/first-timer-definitions";
import { errorMessages } from "@/public/home/first-timer/CreateAccount_error_message";
import UsernameField from "./UsernameField";
import PasswordField from "./PasswordField";
import ConfirmPasswordField from "./ConfirmPasswordField";

export default function CreateAccount({ setSkipClicked }: CreateAccountProps) {
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
    <div className="w-1/4 flex flex-col items-center">
      <div className="flex flex-col gap-3 min-h-64 items-center collapse collapse-open bg-base-100">
        <div className="collapse-title text-xl font-medium underline-offset-8 underline-neutral">
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
      <div className="w-full mt-5 flex justify-between">
        <button
          className="btn btn-lg glass btn-warning rounded-full text-xl font-medium text-primary-content"
          onClick={() => setSkipClicked(true)}
        >
          Skip
        </button>
        <button
          className="btn btn-lg glass btn-info rounded-full text-xl font-medium text-primary-content"
          disabled={
            username && password && confirmPassword && !confirmPasswordError
              ? false
              : true
          }
          onClick={() => setSkipClicked(true)}
        >
          <img src="/butterfly_logo.png" alt="My Icon" className="h-6 w-6" />
          Create
        </button>
      </div>
    </div>
  );
}
