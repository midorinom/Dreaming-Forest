"use client";
import { useState, useEffect } from "react";
import FirstTimer from "@/app/ui/home/first-timer/FirstTimer";
import Dashboard from "@/app/ui/home/dashboard/Dashboard";
import { HomeProps } from "@/app/lib/definitions/home-definitions";
import GenericPageSkeleton from "../general/GenericPageSkeleton";

export default async function Home({ classes }: HomeProps) {
  const [isFirstTimer, setIsFirstTimer] = useState<boolean | "Loading">(
    "Loading"
  );

  //   useEffect(() => {
  //     if (localStorage.getItem("userDetails")) {
  //       setIsFirstTimer(true);
  //     } else {
  //       setIsFirstTimer(false);
  //     }
  //   }, []);

  return (
    <main>
      {isFirstTimer ? (
        isFirstTimer === "Loading" ? (
          <GenericPageSkeleton />
        ) : (
          <FirstTimer classes={classes} setIsFirstTimer={setIsFirstTimer} />
        )
      ) : (
        <Dashboard />
      )}
    </main>
  );
}
