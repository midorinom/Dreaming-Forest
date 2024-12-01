"use client";
import { SyncButtonProps } from "@/app/lib/definitions/settings-definitions";
import { sync } from "@/app/lib/fetches/sync-fetches";

export default function SyncButton({
  user,
  setUser,
  setIsQueryingDatabase,
  setSmallSpiritImage,
}: SyncButtonProps) {
  function handleClick() {
    syncData();

    async function syncData() {
      await sync(user, setUser, setIsQueryingDatabase, setSmallSpiritImage);
    }
  }

  return (
    <button
      className="btn btn-accent h-16 w-1/5 rounded-full text-xl font-medium text-primary-content"
      onClick={handleClick}
    >
      Sync Data
    </button>
  );
}
