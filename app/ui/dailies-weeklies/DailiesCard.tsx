"use client";
import { useState } from "react";
import Image from "next/image";
import { DailiesCardProps } from "@/app/lib/definitions/dailies-weeklies-definitions";

export default function DailiesCard({ character, dailies }: DailiesCardProps) {
  const [done, setDone] = useState<boolean>(true);

  return (
    <div className="flex h-full w-4/5 items-center justify-center">
      <div
        style={{
          position: "relative",
        }}
        className="flex h-full w-full items-center justify-center"
      >
        <Image
          src={character.image ? character.image : "/general/naked_char.png"}
          height={0}
          width={0}
          alt="Character Image"
          sizes="100vw"
          className="absolute h-full w-auto"
        />
      </div>
      <div className="w-1/3">
        <div className="w-fit-content label-text text-lg">{`1 / ${dailies.length}`}</div>
        {/* <input
          type="checkbox"
          className={`checkbox-accent checkbox checkbox-lg w-1/3 cursor-default border-info ${done ? "hover:border-accent" : "hover:border-info"}`}
          checked={done}
        /> */}
      </div>
    </div>
  );
}
