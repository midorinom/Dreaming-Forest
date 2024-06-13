"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { errorMessages } from "@/public/home/first-timer/CreateAccount_error_message";

export default function CreateAccount() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

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

  function handleConfirmPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    const confirmPasswordInput = e.target.value;
    setConfirmPassword(confirmPasswordInput);
  }

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
                className="w-4 h-4 opacity-70"
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
          <div className="relative">
            <label
              className={`${
                passwordError || confirmPasswordError ? "bg-error" : "bg-accent"
              } input input-bordered flex items-center gap-2`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
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
            {(passwordError || confirmPasswordError) && (
              <span className="absolute left-0 top-full mt-0.5 text-sm text-error">
                {passwordError ? passwordError : confirmPasswordError}
              </span>
            )}
          </div>
          <label
            className={`${
              confirmPasswordError ? "bg-error" : "bg-accent"
            } input input-bordered flex items-center gap-2 mb-6`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
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
              placeholder="Confirm Password"
              onChange={handleConfirmPasswordChange}
              maxLength={15}
            />
          </label>
        </div>
      </div>
      <div className="w-full mt-5 flex justify-between">
        <button className="btn btn-lg glass btn-warning rounded-full text-xl font-medium text-primary-content">
          Skip
        </button>
        <button
          className="btn btn-lg glass btn-info rounded-full text-xl font-medium text-primary-content"
          disabled={
            username && password && confirmPassword && !confirmPasswordError
              ? false
              : true
          }
        >
          <img src="/butterfly_logo.png" alt="My Icon" className="h-6 w-6" />
          Create
        </button>
      </div>
    </div>
  );
}
