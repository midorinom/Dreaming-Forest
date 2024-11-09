"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginProps } from "@/app/lib/definitions/welcome-definitions";
import { User } from "@/app/lib/definitions/general-definitions";
import { fetchUserId } from "@/app/lib/fetches/welcome-fetches";
import UsernameField from "../create-account/UsernameField";
import PasswordField from "../create-account/PasswordField";

export default function Login({ setLoginPage, setDialogueIndex }: LoginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  async function handleLogin() {
    const fetchedUser = await fetchUserId(username);

    const newUser: User = {
      userId: fetchedUser.userId,
      username: fetchedUser.username,
      region: fetchedUser.region,
      characters: fetchedUser.characters,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    router.push("/");
  }

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
