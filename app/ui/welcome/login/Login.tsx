"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginProps } from "@/app/lib/definitions/welcome-definitions";
import { User } from "@/app/lib/definitions/general-definitions";
import { fetchUserId } from "@/app/lib/fetches/welcome-fetches";
import {
  fetchAllUserDetails,
  fetchUser,
} from "@/app/lib/fetches/general-fetches";
import { errorMessages } from "@/public/welcome/CreateAccount_error_message";
import bcryptjs from "bcryptjs";
import UsernameField from "./UsernameField";
import PasswordField from "./PasswordField";

export default function Login({ setLoginPage, setDialogueIndex }: LoginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isQueryingDatabase, setIsQueryingDatabase] = useState<boolean>(false);
  const router = useRouter();

  async function handleLogin() {
    setIsQueryingDatabase(true);
    const fetchedUserId = await fetchUserId(username);

    if (!fetchedUserId) {
      setUsernameError(errorMessages.noUser);
      setUsername("");
      setPassword("");
      setIsQueryingDatabase(false);
      return;
    }

    const fetchedUser = await fetchUser(fetchedUserId);
    const passwordMatch = await checkPassword(password, fetchedUser.pw_hash);

    if (!passwordMatch) {
      setPasswordError(errorMessages.wrongPassword);
      setUsername("");
      setPassword("");
      setIsQueryingDatabase(false);
      return;
    }

    setDialogueIndex("login");
    const userDetails: User = await fetchAllUserDetails(fetchedUserId);
    localStorage.setItem("user", JSON.stringify(userDetails));

    setIsQueryingDatabase(false);
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
    <>
      {isQueryingDatabase ? (
        <span className="loading loading-spinner mt-32 h-1/5 w-auto text-accent"></span>
      ) : (
        <div className="flex w-1/4 flex-col items-center">
          <div className="collapse collapse-open flex min-h-48 flex-col items-center gap-3 bg-base-100 pt-8">
            <div className="flex flex-col gap-8">
              <UsernameField
                setUsername={setUsername}
                usernameError={usernameError}
                setUsernameError={setUsernameError}
              />
              <PasswordField
                setPassword={setPassword}
                passwordError={passwordError}
                setPasswordError={setPasswordError}
              />
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
      )}
    </>
  );
}
