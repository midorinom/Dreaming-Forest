"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserDetails } from "@/app/lib/definitions/general-definitions";
import ActiveCharacter from "./ActiveCharacter";
import Bosses from "./Bosses";
import CharactersWheel from "./CharactersWheel";
import DailiesWeeklies from "./DailiesWeeklies";
import DreamySkeleton from "../general/DreamySkeleton";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    characters: [{ image: null }],
    region: "GMS",
  });
  const router = useRouter();

  // Check whether the user is a first-timer
  useEffect(() => {
    const localUserDetails = localStorage.getItem("userDetails");
    if (localUserDetails) {
      setUserDetails(JSON.parse(localUserDetails));
      setIsLoading(false);
    } else {
      router.replace("welcome");
    }
  }, []);

  return isLoading ? (
    <DreamySkeleton />
  ) : (
    <main className="grid grid-rows-[27vh_1fr] grid-cols-[40vw_1fr]">
      <ActiveCharacter activeCharacter={userDetails.characters[0]} />
      <CharactersWheel />
      <DailiesWeeklies />
      <Bosses />
    </main>
  );
}
