"use client";
import { Character, User } from "@/app/lib/definitions/general-definitions";
import { useState, useEffect } from "react";
// import Section1 from "@/app/ui/progression/section1/Section1";
import UnderConstruction from "../general/UnderConstruction";

export default function Progression() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [region, setRegion] = useState<string>("");
  const [activeCharacter, setActiveCharacter] = useState<Character>();

  useEffect(() => {
    const localUser = localStorage.getItem("user");

    if (localUser) {
      const parsedLocalUser: User = JSON.parse(localUser);

      const newCharacters: Character[] = [];
      for (const character of parsedLocalUser.characters) {
        if (character.bosses.length > 0 && character.tracking.bosses) {
          newCharacters.push(character);
        }
      }

      setCharacters(newCharacters);
      setRegion(parsedLocalUser.region);
      setActiveCharacter(newCharacters[0]);
    }
  }, []);

  return (
    // <main className="flex items-center justify-center">
    //   {characters.length > 0 && activeCharacter && (
    //     <div className="collapse grid h-[92%] w-[94%] grid-cols-[0.175fr_0.4fr_0.205fr_0.221fr] bg-primary/85 px-4 py-2">
    //       <Section1 activeCharacter={activeCharacter} />
    //       <div>Section 2</div>
    //       <div>Section 3</div>
    //       <div>Section 4</div>
    //     </div>
    //   )}
    // </main>
    <UnderConstruction />
  );
}
