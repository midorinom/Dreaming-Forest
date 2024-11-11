"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginProps } from "@/app/lib/definitions/welcome-definitions";
import { fetchUserId } from "@/app/lib/fetches/welcome-fetches";
import { fetchUser } from "@/app/lib/fetches/general-fetches";
import bcryptjs from "bcryptjs";
import UsernameField from "./UsernameField";
import PasswordField from "./PasswordField";

export default function Login({ setLoginPage, setDialogueIndex }: LoginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const router = useRouter();

  async function handleLogin() {
    const fetchedUserId = await fetchUserId(username);

    if (!fetchedUserId) {
      console.log("No user with that username");
      return;
    }

    const fetchedUser = await fetchUser(fetchedUserId);
    const passwordMatch = await checkPassword(password, fetchedUser.pw_hash);

    if (!passwordMatch) {
      console.log("Wrong password");
      return;
    }

    const newUser = {
      userId: fetchedUser.user_id,
      username: fetchedUser.username,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    router.push("/");
  }

  async function checkPassword(
    inputPassword: string,
    storedHash: string,
  ): Promise<boolean> {
    const passwordMatch = await bcryptjs.compare(inputPassword, storedHash);
    return passwordMatch;
  }

  return (
    <div className="flex w-1/4 flex-col items-center">
      <div className="collapse collapse-open flex min-h-48 flex-col items-center gap-3 bg-base-100 pt-8">
        <div className="flex flex-col gap-8">
          <UsernameField
            setUsername={setUsername}
            usernameError={usernameError}
            setUsernameError={setUsernameError}
          />
          <PasswordField setPassword={setPassword} />
        </div>
      </div>
      <div className="mt-5 flex w-full justify-between">
        <button
          className="btn btn-warning btn-lg rounded-full text-xl font-medium text-primary-content"
          onClick={() => {
            setLoginPage(false);
            setDialogueIndex("select_region");
          }}
        >
          I am new!
        </button>
        <button
          className="btn glass btn-accent btn-lg rounded-full text-xl font-medium text-primary-content"
          disabled={username && password ? false : true}
          onClick={() => handleLogin()}
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
