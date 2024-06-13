"use client";
import { useState, ChangeEvent } from "react";

export default function CreateAccount() {
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const ignInput = e.target.value;
    const alphanumericRegex = /^[a-zA-Z0-9À-ÿ]*$/; // Alphanumeric regex with accents

    if (!alphanumericRegex.test(ignInput)) {
      if (!isInvalid) {
        setIsInvalid(true);
      }
    } else {
      if (isInvalid) {
        setIsInvalid(false);
      }
    }
  }

  return (
    <div className="w-1/4 flex flex-col items-center">
      <div className="flex flex-col min-h-64 items-center gap-4 collapse collapse-open bg-base-100">
        <div className="collapse-title text-xl font-medium underline-offset-8 underline-neutral">
          Create Account
        </div>
        <label className="input input-bordered bg-primary flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input type="text" className="grow" placeholder="Username" />
        </label>
        <label className="input input-bordered bg-accent flex items-center gap-2">
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
          <input type="password" className="grow" placeholder="Password" />
        </label>
        <label className="mb-6 input input-bordered bg-accent flex items-center gap-2">
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
          />
        </label>
      </div>
      <button className="self-end btn btn-lg glass btn-info rounded-full mt-4 text-xl font-medium text-primary-content">
        <img src="/butterfly_logo.png" alt="My Icon" className="h-6 w-6" />
        Proceed
      </button>
    </div>
  );
}
