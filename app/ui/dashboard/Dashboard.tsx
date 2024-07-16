"use client";
import { useState, useEffect } from "react";
import { DashboardProps } from "@/app/lib/definitions/dashboard-definitions";
import type {
  Character,
  User,
} from "@/app/lib/definitions/general-definitions";
import ActiveCharacter from "./ActiveCharacter";
import Bosses from "./Bosses";
import CharactersWheel from "./CharactersWheel";
import DailiesWeeklies from "./DailiesWeeklies";

export default function Dashboard({ bossesInfo }: DashboardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [activeCharacter, setActiveCharacter] = useState<Character>();

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
      setActiveCharacter(JSON.parse(localUser).characters[0]);
    }
  }, []);

  return (
    <main className="grid grid-cols-[40vw_1fr] grid-rows-[27vh_1fr]">
      {user && activeCharacter && (
        <>
          <ActiveCharacter activeCharacter={user.characters[0]} />
          <CharactersWheel />
          <DailiesWeeklies
            region={user.region}
            activeCharacter={user.characters[0]}
          />
          <Bosses
            region={user.region}
            activeCharacter={user.characters[0]}
            bossesInfo={bossesInfo}
          />
        </>
      )}
    </main>
  );
}
