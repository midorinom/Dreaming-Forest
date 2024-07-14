"use client";
import { useState, useEffect } from "react";
import type { User } from "@/app/lib/definitions/general-definitions";
import ActiveCharacter from "./ActiveCharacter";
import Bosses from "./Bosses";
import CharactersWheel from "./CharactersWheel";
import DailiesWeeklies from "./DailiesWeeklies";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  return (
    <main className="grid grid-rows-[27vh_1fr] grid-cols-[40vw_1fr]">
      {user && (
        <>
          <ActiveCharacter character={user.characters[0]} />
          <CharactersWheel />
          <DailiesWeeklies region={user.region} characters={user.characters} />
          <Bosses region={user.region} characters={user.characters} />
        </>
      )}
    </main>
  );
}
