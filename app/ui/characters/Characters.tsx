"use client";
import { useState, useEffect } from "react";
import type { User } from "@/app/lib/definitions/general-definitions";
import ViewCharacters from "./ViewCharacters";
import NavBar from "./NavBar";

export default function Characters() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  return (
    <main className="grid grid-cols-[1fr_12vw]">
      {user && (
        <>
          <ViewCharacters charactersProp={user.characters} />
          <div>
            <NavBar />
            <div>Pagination</div>
          </div>
        </>
      )}
    </main>
  );
}
