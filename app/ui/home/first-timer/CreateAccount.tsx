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
    <div className="w-1/2 collapse collapse-open bg-warning">
      <div className="collapse-title text-xl font-medium underline-offset-8 underline-neutral">
        Create Account
      </div>
      <div className="collapse-content flex flex-col items-center gap-4">
        <input
          className="w-1/3 h-8 text-center"
          type="text"
          placeholder="username"
        />
        <input
          className="w-1/3 h-8 text-center"
          type="password"
          placeholder="password"
        />
        <button className="w-1/3 btn btn-lg btn-info rounded-full mt-4 text-xl font-medium text-primary-content">
          <img src="/butterfly_logo.png" alt="My Icon" className="h-6 w-6" />
          Proceed
        </button>
      </div>
    </div>
  );
}
