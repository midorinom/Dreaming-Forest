"use client";
import { useState } from "react";
import Image from "next/image";
import type { BossesEditCardProps } from "@/app/lib/definitions/dashboard-definitions";

export default function BossesEditCard({
  bossInfoProp,
  boss,
  setBosses,
}: BossesEditCardProps) {
  return (
    <div className="inline-flex items-center justify-center">
      <Image
        src={bossInfoProp.dashboard_image}
        height={0}
        width={0}
        alt={bossInfoProp.dashboard_image}
        sizes="100vw"
        className={`${!boss && "grayscale"} h-auto max-h-[4.5rem] w-full hover:cursor-pointer`}
      />
    </div>
  );
}
