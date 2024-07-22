"use client";
import { useState, useEffect } from "react";
import type { User } from "@/app/lib/definitions/general-definitions";
import CharacterCard from "./CharacterCard";
import ViewCharacters from "./ViewCharacters";

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
            <div>NavBar</div>
            <div>Pagination</div>
          </div>
        </>
      )}
    </main>
  );
}
