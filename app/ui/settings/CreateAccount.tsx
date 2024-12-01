"use client";
import { useState, useEffect } from "react";
import { fetchUserId } from "@/app/lib/fetches/welcome-fetches";
import { errorMessages } from "@/public/welcome/CreateAccount_error_message";
import UsernameField from "./UsernameField";
import PasswordField from "./PasswordField";
import ConfirmPasswordField from "./ConfirmPasswordField";
import { CreateAccountProps } from "@/app/lib/definitions/settings-definitions";

export default function CreateAccount({
  user,
  setCreateAccountClicked,
}: CreateAccountProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [isQueryingDatabase, setIsQueryingDatabase] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError(errorMessages.confirmPassword);
    } else {
      setConfirmPasswordError("");
    }
  }, [password, confirmPassword]);

  async function handleSubmit() {
    setIsQueryingDatabase(true);
    const fetchedUserId = await fetchUserId(username);

    if (fetchedUserId) {
      setUsernameError(errorMessages.duplicateUser);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setIsQueryingDatabase(false);
      return;
    }

    setIsQueryingDatabase(false);
    setDone(true);
  }

  return (
    <>
      <div className="flex w-full items-center justify-center">
        {isQueryingDatabase ? (
          <span className="loading loading-spinner h-1/3 w-auto text-accent"></span>
        ) : (
          <div className="flex w-[30%] flex-col items-center justify-center">
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
                onClick={() => setCreateAccountClicked(false)}
              >
                Back
              </button>
              <button
                className="btn glass btn-accent btn-lg rounded-full text-xl font-medium text-primary-content"
                disabled={
                  username &&
                  password &&
                  confirmPassword &&
                  !confirmPasswordError
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
        )}
      </div>
    </>
  );
}
