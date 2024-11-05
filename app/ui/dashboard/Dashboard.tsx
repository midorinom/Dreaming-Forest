"use client";
import { useState, useEffect } from "react";
import { UUID } from "crypto";
import { DashboardProps } from "@/app/lib/definitions/dashboard-definitions";
import type {
  Character,
  User,
} from "@/app/lib/definitions/general-definitions";
import ActiveCharacter from "./ActiveCharacter";
import Bosses from "./bosses/Bosses";
import CharactersWheel from "./characters-wheel/CharactersWheel";
import DailiesWeeklies from "./DailiesWeeklies";

export default function Dashboard({ bossesInfo }: DashboardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [activeCharacter, setActiveCharacter] = useState<Character>();

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const parsedUser: User = JSON.parse(localUser);

      if (parsedUser.username) {
        getAndSet(parsedUser);
      } else {
        setUser(JSON.parse(localUser));
        setActiveCharacter(JSON.parse(localUser).characters[0]);
      }
    }

    async function getAndSet(parsedUser: User) {
      const fetchedUser = await fetchUser(parsedUser.userId);
      console.log(fetchedUser);
    }

    async function fetchUser(userId: UUID) {
      const response = await fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });

      const res = await response.json();
      return res;
    }
  }, []);

  return (
    <main className="grid grid-cols-[40vw_1fr] grid-rows-[27vh_1fr]">
      {user && activeCharacter && (
        <>
          <ActiveCharacter activeCharacter={activeCharacter} />
          <CharactersWheel
            activeCharacter={activeCharacter}
            setActiveCharacter={setActiveCharacter}
            charactersProp={user.characters}
          />
          <DailiesWeeklies
            region={user.region}
            activeCharacter={activeCharacter}
          />
          {activeCharacter.tracking.bosses && (
            <Bosses
              region={user.region}
              activeCharacter={activeCharacter}
              bossesInfo={bossesInfo}
            />
          )}
        </>
      )}
    </main>
  );
}
