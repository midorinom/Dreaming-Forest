"use client";
import { useState, useEffect } from "react";
import { DashboardProps } from "@/app/lib/definitions/dashboard-definitions";
import type {
  Character,
  User,
} from "@/app/lib/definitions/general-definitions";
import {
  fetchCharacters,
  fetchTracking,
  fetchUser,
} from "@/app/lib/fetches/general-fetches";
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
      const fetchedCharacters = await fetchCharacters(parsedUser.userId);

      setUser({
        userId: fetchedUser.userId,
        username: fetchedUser.username,
        region: fetchedUser.region,
        characters: fetchedUser.characters,
      });

      const fetchedTracking = await fetchTracking(
        fetchedCharacters[0].character_id,
      );

      setActiveCharacter({
        characterId: fetchedCharacters[0].characterId,
        image: fetchedCharacters[0].image,
        ign: fetchedCharacters[0].ign,
        level: fetchedCharacters[0].level,
        maplestoryClass: fetchedCharacters[0].maplestoryClass,
        dailies: [],
        weeklies: [],
        bosses: [],
        position: fetchedCharacters[0].position,
        tracking: {
          dailies: fetchedTracking.dailies,
          weeklies: fetchedTracking.weeklies,
          bosses: fetchedTracking.bosses,
          progression: fetchedTracking.progression,
        },
      });
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
