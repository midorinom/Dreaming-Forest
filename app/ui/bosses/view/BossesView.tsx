"use client";
import { BossesViewProps } from "@/app/lib/definitions/bosses-definitions";

export default function BossesView({
  bossesInfo,
  characters,
  region,
}: BossesViewProps) {
  return (
    <div className="grid h-full w-full grid-cols-[20vw_1fr] grid-rows-[15vh_1fr_12vh]">
      <div className="col-start-2 row-span-1 border-4 border-black"></div>
      <div className="col-span-1 row-span-1 row-start-2 border-4 border-black"></div>
      <div className="col-start-2 row-span-1 row-start-2 border-4 border-white"></div>
      <div className="col-span-1 row-start-3 border-4 border-accent"></div>
      <div className="col-start-2 row-start-3 border-4 border-black"></div>
    </div>
  );
}
