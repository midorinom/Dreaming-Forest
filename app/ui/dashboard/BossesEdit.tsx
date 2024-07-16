"use client";
import { useState } from "react";
import Image from "next/image";
import type { BossesEditProps } from "@/app/lib/definitions/dashboard-definitions";

export default function Bosses({ setEditBossesClicked }: BossesEditProps) {
  return (
    <div className="mt-2 flex w-full flex-col items-center">
      <div className={"pb3 collapse collapse-open w-4/5 gap-2 bg-base-100"}>
        <div className="collapse-title pb-0 pl-2 pr-5 pt-3">
          <div className="flex content-center">
            <Image
              src="/general/ui_icons/back_icon.png"
              height={0}
              width={0}
              alt="Back Button"
              sizes="100vw"
              className="absolute h-[2.75rem] w-[auto] hover:cursor-pointer"
              onClick={() => setEditBossesClicked(false)}
            />
            <div className="flex-grow"></div>
            <span className="text-4xl font-medium text-info underline-offset-8 underline-dreamy-neutral">
              Bosses
            </span>
            <div className="flex-grow"></div>
          </div>
        </div>
        {<div className="collapse-content max-h-[50vh] pb-0 pt-0"></div>}
      </div>
    </div>
  );
}
