"use client";
import { useState, useEffect } from "react";
import { UserDetails } from "@/app/lib/definitions/general-definitions";
import ResetButton from "@/app/ui/general/ResetButton";
import UnderConstruction from "@/app/ui/general/UnderConstruction";

export default function Settings() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const localUserDetails = localStorage.getItem("userDetails");
    if (localUserDetails) {
      setUserDetails(JSON.parse(localUserDetails));
    }
  }, []);

  return (
    <div className="relative">
      <UnderConstruction />
      {userDetails && <ResetButton userDetails={userDetails} />}
    </div>
  );
}
