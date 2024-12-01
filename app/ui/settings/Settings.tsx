"use client";
import { useState, useEffect } from "react";
import { User } from "@/app/lib/definitions/general-definitions";
import SyncButton from "@/app/ui/settings/SyncButton";
import ResetButton from "@/app/ui/settings/ResetButton";

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  return (
    <div className="relative mt-8 flex flex-col items-center gap-8">
      {user && <SyncButton user={user} />}
      {user && <ResetButton user={user} />}
    </div>
  );
}
