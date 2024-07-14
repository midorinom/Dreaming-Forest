"use client";
import { useState, useEffect } from "react";
import { User } from "@/app/lib/definitions/general-definitions";
import ResetButton from "@/app/ui/general/ResetButton";
import UnderConstruction from "@/app/ui/general/UnderConstruction";

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  return (
    <div className="relative">
      <UnderConstruction />
      {user && <ResetButton user={user} />}
    </div>
  );
}
