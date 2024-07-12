"use client";
import { useState, useEffect } from "react";
import type { UserDetails } from "@/app/lib/definitions/general-definitions";
import ActiveCharacter from "./ActiveCharacter";
import Bosses from "./Bosses";
import CharactersWheel from "./CharactersWheel";
import DailiesWeeklies from "./DailiesWeeklies";

export default function Dashboard() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const localUserDetails = localStorage.getItem("userDetails");
    if (localUserDetails) {
      setUserDetails(JSON.parse(localUserDetails));
    }
  }, []);

  return (
    <main className="grid grid-rows-[27vh_1fr] grid-cols-[40vw_1fr]">
      {userDetails && (
        <>
          <ActiveCharacter character={userDetails.characters[0]} />
          <CharactersWheel />
          <DailiesWeeklies region={userDetails.region} />
          <Bosses region={userDetails.region} />
        </>
      )}
    </main>
  );
}
