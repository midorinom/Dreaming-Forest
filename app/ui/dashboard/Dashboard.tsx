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
  const [isQueryingDatabase, setIsQueryingDatabase] = useState<boolean>(false);

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
      setIsQueryingDatabase(true);
      const fetchedUser = await fetchUser(parsedUser.userId);
      const fetchedCharacters = await fetchCharacters(parsedUser.userId);

      const characters: Character[] = [];
      for (const character of fetchedCharacters) {
        const newCharacter: Character = {
          characterId: character.character_id,
          image: character.image,
          ign: character.ign,
          level: character.level,
          maplestoryClass: character.class_name,
          dailies: [],
          weeklies: [],
          bosses: [],
          position: character.position,
          tracking: {
            dailies: true,
            weeklies: true,
            bosses: true,
            progression: true,
          },
        };
        characters.push(newCharacter);
      }

      setUser({
        userId: fetchedUser.user_id,
        username: fetchedUser.username,
        region: fetchedUser.region,
        characters: characters,
      });

      const fetchedTracking = await fetchTracking(characters[0].characterId);
      characters[0].tracking = {
        dailies: fetchedTracking.dailies,
        weeklies: fetchedTracking.weeklies,
        bosses: fetchedTracking.bosses,
        progression: fetchedTracking.progression,
      };

      setActiveCharacter(characters[0]);
      setIsQueryingDatabase(false);
    }
  }, []);

  return (
    <>
      {isQueryingDatabase ? (
        <span className="loading loading-spinner m-auto h-1/3 w-auto text-accent"></span>
      ) : (
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
      )}
    </>
  );
}
