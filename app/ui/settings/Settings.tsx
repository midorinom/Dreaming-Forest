"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { User } from "@/app/lib/definitions/general-definitions";
import SyncButton from "./SyncButton";
import ResetButton from "./ResetButton";
import CreateAccount from "./CreateAccountButton";

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);
  const [isQueryingDatabase, setIsQueryingDatabase] = useState<string>("");
  const [smallSpiritImage, setSmallSpiritImage] = useState<string>(
    "/welcome/small_spirit_smiling.png",
  );

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  return (
    <>
      {!isQueryingDatabase ? (
        <div className="flex flex-col items-center justify-center">
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
          <span className="loading loading-spinner m-auto h-1/3 w-auto text-accent"></span>
        </div>
      ) : (
        <div className="relative mt-8 flex flex-col items-center gap-8">
          {user &&
            (user.username ? (
              <SyncButton
                user={user}
                setIsQueryingDatabase={setIsQueryingDatabase}
                setSmallSpiritImage={setSmallSpiritImage}
              />
            ) : (
              <CreateAccount user={user} />
            ))}
          {user && <ResetButton user={user} />}
        </div>
      )}
    </>
  );
}
