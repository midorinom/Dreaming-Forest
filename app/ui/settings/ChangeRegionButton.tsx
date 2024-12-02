"use client";
import { useState } from "react";
import { ChangeRegionButtonProps } from "@/app/lib/definitions/settings-definitions";
import { User } from "@/app/lib/definitions/general-definitions";

export default function ChangeRegionButton({
  user,
  setUser,
}: ChangeRegionButtonProps) {
  const [showRegions, setShowRegion] = useState<boolean>(false);
  const [region, setRegion] = useState<string>(user.region);

  function handleRegionSelect(selectedRegion: string) {
    if (selectedRegion !== region) {
      setRegion(selectedRegion);

      const newUser: User = JSON.parse(JSON.stringify(user));
      newUser.region = selectedRegion;
      setUser(newUser);
    }

    setShowRegion(false);
  }

  return (
    <>
      {showRegions ? (
        <div className="flex h-20 w-1/5 items-center justify-center gap-8 rounded-full bg-accent">
          <button
            className={
              region === "MSEA"
                ? "btn btn-primary"
                : "btn btn-outline btn-neutral"
            }
            onClick={() => handleRegionSelect("MSEA")}
          >
            MSEA
          </button>
          <button
            className={
              region === "GMS"
                ? "btn btn-primary"
                : "btn btn-outline btn-neutral"
            }
            onClick={() => handleRegionSelect("GMS")}
          >
            GMS
          </button>
        </div>
      ) : (
        <button
          className="btn btn-accent h-16 w-1/5 rounded-full text-xl font-medium text-primary-content"
          onClick={() => setShowRegion(true)}
        >
          Change Region
        </button>
      )}
    </>
  );
}
