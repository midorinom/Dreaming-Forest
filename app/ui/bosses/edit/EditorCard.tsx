"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { EditorCardProps } from "@/app/lib/definitions/bosses-definitions";

export default function EditorCard({
  boss,
  bossesInfo,
  activeCharacter,
  setCharacters,
}: EditorCardProps) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 items-center justify-items-center bg-neutral">
      <div
        style={{
          position: "relative",
        }}
        className="row-span-2 flex h-[85%] w-full items-center justify-center"
      >
        <Image
          src={bossesInfo[boss.bossesPosition].bosses_image}
          height={0}
          width={0}
          alt="Character Image"
          sizes="100vw"
          className="absolute h-full w-auto hover:cursor-pointer"
        />
      </div>
      <div>{boss.partySize}</div>
      <div>Slider</div>
    </div>
  );
}
