"use client";
import { useState, useEffect } from "react";
import FirstTimer from "@/app/ui/home/first-timer/FirstTimer";
import Dashboard from "@/app/ui/home/dashboard/Dashboard";
import { HomeProps } from "@/app/lib/definitions/home-definitions";
import GenericSkeleton from "../general/GenericSkeleton";

export default async function Home({ classes }: HomeProps) {
  const [isFirstTimer, setIsFirstTimer] = useState<boolean | "Loading">(
    "Loading"
  );

  useEffect(() => {
    if (localStorage.getItem("userDetails")) {
      setIsFirstTimer(true);
    } else {
      setIsFirstTimer(false);
    }
  }, []);

  return (
    <main className="bg-elodin_background bg-cover bg-center h-screen">
      {isFirstTimer ? (
        isFirstTimer === "Loading" ? (
          <GenericSkeleton />
        ) : (
          <FirstTimer classes={classes} setIsFirstTimer={setIsFirstTimer} />
        )
      ) : (
        <Dashboard />
      )}
    </main>
  );
}
