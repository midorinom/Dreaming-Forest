"use client";
import { useState, useEffect } from "react";
import { User, Character } from "@/app/lib/definitions/general-definitions";
import Dailies from "./Dailies";
import Weeklies from "./Weeklies";

export default function DailiesWeeklies() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const localUser = localStorage.getItem("user");

    if (localUser) {
      const parsedLocalUser: User = JSON.parse(localUser);
      setCharacters(parsedLocalUser.characters);
    }
  }, []);

  return (
    <main className="flex justify-around p-12">
      {characters.length > 0 && (
        <>
          <Dailies charactersProp={characters} />
          <Weeklies charactersProp={characters} />
        </>
      )}
    </main>
  );
}
