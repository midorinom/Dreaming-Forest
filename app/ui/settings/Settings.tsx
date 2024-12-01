"use client";
import { useState, useEffect } from "react";
import { User } from "@/app/lib/definitions/general-definitions";
import SyncButton from "./SyncButton";
import ResetButton from "./ResetButton";
import CreateAccount from "./CreateAccountButton";

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);
  const [isQueryingDatabase, setIsQueryingDatabase] = useState<boolean>(false);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  return (
    <>
      {isQueryingDatabase ? (
        <span className="loading loading-spinner m-auto h-1/3 w-auto text-accent"></span>
      ) : (
        <div className="relative mt-8 flex flex-col items-center gap-8">
          {user &&
            (user.username ? (
              <SyncButton user={user} />
            ) : (
              <CreateAccount user={user} />
            ))}
          {user && <ResetButton user={user} />}
        </div>
      )}
    </>
  );
}
