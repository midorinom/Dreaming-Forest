"use client";
import { useState, useEffect } from "react";
import { User, Character } from "@/app/lib/definitions/general-definitions";
import Dailies from "./Dailies";
import Weeklies from "./Weeklies";

export default function DailiesWeeklies() {
  const [dailiesCharacters, setDailiesCharacters] = useState<Character[]>([]);
  const [weekliesCharacters, setWeekliesCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const localUser = localStorage.getItem("user");

    if (localUser) {
      const parsedLocalUser: User = JSON.parse(localUser);
      const newDailiesCharacters: Character[] = [];
      const newWeekliesCharacters: Character[] = [];

      for (const character of parsedLocalUser.characters) {
        if (character.dailies.length !== 0 && character.tracking.dailies) {
          newDailiesCharacters.push(character);
        }

        if (character.weeklies.length !== 0 && character.tracking.weeklies) {
          newWeekliesCharacters.push(character);
        }
      }

      setDailiesCharacters(newDailiesCharacters);
      setWeekliesCharacters(newWeekliesCharacters);
    }
  }, []);

  return (
    <main className="flex justify-around p-12">
      {dailiesCharacters.length > 0 && (
        <Dailies
          dailiesCharacters={dailiesCharacters}
          setDailiesCharacters={setDailiesCharacters}
        />
      )}
      {weekliesCharacters.length > 0 && (
        <Weeklies
          weekliesCharacters={weekliesCharacters}
          setWeekliesCharacters={setWeekliesCharacters}
        />
      )}
    </main>
  );
}
