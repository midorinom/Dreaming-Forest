"use client";
import { useState } from "react";
import { LoginProps } from "@/app/lib/definitions/welcome-definitions";
import UsernameField from "../create-account/UsernameField";
import PasswordField from "../create-account/PasswordField";

// TODO: option to either login or create a new account
export default function Login({ setLoginPage }: LoginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="flex w-1/4 flex-col items-center">
      <div className="collapse collapse-open flex min-h-48 flex-col items-center gap-3 bg-base-100 pt-8">
        <div className="flex flex-col gap-8">
          <UsernameField setUsername={setUsername} />
          <PasswordField setPassword={setPassword} confirmPasswordError="" />
        </div>
      </div>
      <div className="mt-5 flex w-full justify-between">
        <button
          className="btn btn-warning btn-lg text-xl font-medium text-primary-content"
          onClick={() => setLoginPage(false)}
        >
          I am new!
        </button>
        <button
          className="btn glass btn-accent btn-lg rounded-full text-xl font-medium text-primary-content"
          disabled={username && password ? false : true}
          // onClick={() => setDone(true)}
        >
          <img
            src="/general/ui_icons/butterfly_logo.png"
            alt="Butterfly Logo"
            className="h-7 w-7"
          />
          Login
        </button>
      </div>
    </div>
  );
}
