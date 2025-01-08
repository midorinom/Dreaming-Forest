"use client";
import Image from "next/image";
import { BossesListCardProps } from "@/app/lib/definitions/bosses-definitions";

export default function BossesListCard({ meso, image }: BossesListCardProps) {
  return (
    <>
      <div className="col-start-1 w-[90%] rounded-md bg-neutral p-1 text-center text-xl">
        {meso.toLocaleString()}
      </div>
      <div
        style={{
          position: "relative",
        }}
        className="col-start-2 flex h-full w-full items-center justify-center"
      >
        <Image
          src={image ? image : "/general/naked_char.png"}
          height={0}
          width={0}
          alt="Boss Image"
          sizes="100vw"
          className="absolute h-full w-auto"
        />
      </div>
    </>
  );
}
