"use client";
import { useState } from "react";
import Image from "next/image";

export default function DailiesCard() {
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
          src={"/general/naked_char.png"}
          height={0}
          width={0}
          alt="Character Image"
          sizes="100vw"
          className="absolute h-full w-auto"
        />
      </div>
      <div className="w-1/3">
        <div className="label-text w-1/3 text-lg">1/5</div>
        {/* <input
          type="checkbox"
          className={`checkbox-accent checkbox checkbox-lg w-1/3 cursor-default border-info ${done ? "hover:border-accent" : "hover:border-info"}`}
          checked={done}
        /> */}
      </div>
    </div>
  );
}
