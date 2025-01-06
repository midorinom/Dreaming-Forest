"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const parsedUser: User = JSON.parse(localUser);

      setUser(parsedUser);

      if (id) {
        const redirectedCharacter: Character | undefined =
          parsedUser.characters.find((character) => {
            return character.characterId.toString() === id;
          });

        if (redirectedCharacter) {
          setActiveCharacter(redirectedCharacter);
          window.history.replaceState(null, "", "/");
        } else {
          setActiveCharacter(parsedUser.characters[0]);
        }
      } else {
        setActiveCharacter(parsedUser.characters[0]);
      }
    }
  }, []);

  return (
    <>
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
    </>
  );
}
