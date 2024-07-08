"use client";
import { useState, useEffect } from "react";
import FirstTimer from "@/app/ui/home/first-timer/FirstTimer";
import MainApp from "@/app/ui/home/MainApp";
import Dashboard from "@/app/ui/home/dashboard/Dashboard";
import { HomeProps } from "@/app/lib/definitions/home-definitions";
import { UserDetails } from "@/app/lib/definitions/general-definitions";
import GenericPageSkeleton from "../general/GenericPageSkeleton";

export default function Home({ classes }: HomeProps) {
  const [isFirstTimer, setIsFirstTimer] = useState<boolean | "Loading">(
    "Loading"
  );
  const [userDetails, setUserDetails] = useState<UserDetails>({
    characters: [{ image: null }],
    region: "GMS",
  });

  useEffect(() => {
    const localUserDetails = localStorage.getItem("userDetails");
    if (localUserDetails) {
      setUserDetails(JSON.parse(localUserDetails));
      setIsFirstTimer(false);
    } else {
      setIsFirstTimer(true);
    }
  }, []);

  return (
    <main>
      {isFirstTimer ? (
        isFirstTimer === "Loading" ? (
          <GenericPageSkeleton />
        ) : (
          <FirstTimer classes={classes} setIsFirstTimer={setIsFirstTimer} />
        )
      ) : (
        <MainApp pageComponent={<Dashboard userDetails={userDetails} />} />
      )}
    </main>
  );
}
