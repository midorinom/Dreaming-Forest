"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { User } from "@/app/lib/definitions/general-definitions";
import SyncButton from "./SyncButton";
import ResetButton from "./ResetButton";
import CreateAccountButton from "./CreateAccountButton";
import CreateAccount from "./CreateAccount";
import ChangeRegionButton from "./ChangeRegionButton";

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);
  const [isQueryingDatabase, setIsQueryingDatabase] = useState<string>("");
  const [smallSpiritImage, setSmallSpiritImage] = useState<string>(
    "/welcome/small_spirit_smiling.png",
  );
  const [createAccountClicked, setCreateAccountClicked] =
    useState<boolean>(false);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  return (
    <>
      {isQueryingDatabase ? (
        <div className="flex flex-col items-center justify-start gap-32">
          <div className="flex w-1/2 items-center">
            <Image
              src={smallSpiritImage}
              height={0}
              width={0}
              alt="Small Spirit"
              sizes="100vw"
              className="h-44 w-auto"
            />
            {isQueryingDatabase && (
              <div className="chat chat-start min-w-80">
                <div className="chat-bubble chat-bubble-accent">
                  {isQueryingDatabase}
                </div>
              </div>
            )}
          </div>
          <span className="loading loading-spinner relative right-8 mx-auto h-1/3 w-auto text-accent"></span>
        </div>
      ) : createAccountClicked && user ? (
        <CreateAccount
          user={user}
          setUser={setUser}
          setCreateAccountClicked={setCreateAccountClicked}
          setIsQueryingDatabase={setIsQueryingDatabase}
          setSmallSpiritImage={setSmallSpiritImage}
        />
      ) : (
        <div className="relative flex flex-col items-center justify-center gap-8">
          {user && (
            <>
              {user.username ? (
                <SyncButton
                  user={user}
                  setUser={setUser}
                  setIsQueryingDatabase={setIsQueryingDatabase}
                  setSmallSpiritImage={setSmallSpiritImage}
                />
              ) : (
                <CreateAccountButton
                  setCreateAccountClicked={setCreateAccountClicked}
                />
              )}
              {<ChangeRegionButton user={user} />}
              {<ResetButton user={user} />}
            </>
          )}
        </div>
      )}
    </>
  );
}
