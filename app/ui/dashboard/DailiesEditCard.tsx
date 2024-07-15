import { useState } from "react";
import Image from "next/image";
import type { DailiesEditCardProps } from "@/app/lib/definitions/dashboard-definitions";

export default function DailiesEditCard({
  daily,
  setDailies,
}: DailiesEditCardProps) {
  return (
    <div className="flex content-center justify-between">
      <Image
        src="/general/ui_icons/bars_icon.png"
        height={0}
        width={0}
        alt="Rearrange Button"
        sizes="100vw"
        className="h-[2.75rem] w-[auto] hover:cursor-pointer"
      />
      <span className="text-4xl font-medium text-info">
        {daily.description}
      </span>
      <button className="btn btn-neutral text-3xl text-info">-</button>
    </div>
  );
}
